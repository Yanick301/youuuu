'use client';

import { products } from '@/lib/data';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Heart, ShoppingCart, Star, CheckCircle } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { useState, useEffect, useMemo } from 'react';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { useTranslation } from '@/hooks/use-translation';
import { useUser, useFirestore, useCollection, useMemoFirebase, addDocumentNonBlocking, deleteDocumentNonBlocking } from '@/firebase';
import { collection, query, where, getDocs, doc } from 'firebase/firestore';
import { useCart } from '@/contexts/cart-context';
import { Review } from '@/lib/definitions';

// This function can be uncommented if you switch to a static generation approach
// export async function generateStaticParams() {
//   return products.map((product) => ({
//     slug: product.slug,
//   }));
// }

export default function ProductDetailPage({ params }: { params: { slug: string } }) {
  const { t } = useTranslation();
  const product = products.find((p) => p.slug === params.slug);
  const { toast } = useToast();
  const { user } = useUser();
  const firestore = useFirestore();
  const { addToCart } = useCart();

  const [selectedSize, setSelectedSize] = useState<string | null>(product?.options?.sizes?.[0] || null);
  const [selectedColor, setSelectedColor] = useState<string | null>(product?.options?.colors?.[0] || null);
  
  // -- Favorite Logic --
  const [isFavorite, setIsFavorite] = useState(false);
  const [favoriteId, setFavoriteId] = useState<string | null>(null);
  const [isFavoriteLoading, setIsFavoriteLoading] = useState(true);
  
  const favoritesCollectionRef = useMemoFirebase(() => {
    if (!firestore || !user) return null;
    return collection(firestore, `users/${user.uid}/favorites`);
  }, [firestore, user]);

  useEffect(() => {
    if (!user || !firestore || !product) {
        setIsFavoriteLoading(false);
        return;
    }

    const checkFavoriteStatus = async () => {
        setIsFavoriteLoading(true);
        const q = query(collection(firestore, `users/${user.uid}/favorites`), where("productId", "==", product.id));
        
        try {
            const querySnapshot = await getDocs(q);
            if (!querySnapshot.empty) {
                const favDoc = querySnapshot.docs[0];
                setIsFavorite(true);
                setFavoriteId(favDoc.id);
            } else {
                setIsFavorite(false);
                setFavoriteId(null);
            }
        } catch (error) {
            console.error("Error checking favorite status:", error);
            setIsFavorite(false);
            setFavoriteId(null);
        } finally {
            setIsFavoriteLoading(false);
        }
    };

    checkFavoriteStatus();
  }, [user, firestore, product]);


  const handleFavoriteClick = async () => {
    if (!user || !product || !favoritesCollectionRef) {
      toast({
        variant: "destructive",
        title: "Veuillez vous connecter",
        description: "Vous devez être connecté pour gérer vos favoris.",
      });
      return;
    }
    setIsFavoriteLoading(true);

    if (isFavorite && favoriteId) {
      // Remove from favorites
      const docRef = doc(favoritesCollectionRef, favoriteId);
      deleteDocumentNonBlocking(docRef);
      setIsFavorite(false);
      setFavoriteId(null);
      toast({
        title: t('product_page.toast.favorite_removed_title'),
        description: `${productName} ${t('product_page.toast.favorite_removed_desc')}`,
      });
    } else {
      // Add to favorites
      const newFav = {
        userId: user.uid,
        productId: product.id,
        addedDate: new Date().toISOString(),
      };
      // addDocumentNonBlocking returns a promise with the doc ref
      addDocumentNonBlocking(favoritesCollectionRef, newFav).then(docRef => {
        if(docRef) {
          setIsFavorite(true);
          setFavoriteId(docRef.id);
        }
      });
      
      toast({
        title: t('product_page.toast.favorite_added_title'),
        description: `${productName} ${t('product_page.toast.favorite_added_desc')}`,
      });
    }
    // Note: We don't wait for the async operation to finish to update the UI
    // The loading state is primarily for the initial check. Toggling can feel instant.
    setIsFavoriteLoading(false);
  };
  // -- End of Favorite Logic --


  const [reviews, setReviews] = useState<Review[]>([
    { id: '1', author: "Marie L.", rating: 5, comment: "Qualité exceptionnelle et coupe parfaite. Je recommande vivement !" },
    { id: '2', author: "Jean D.", rating: 4, comment: "Très beau produit, conforme à la description. La livraison a été rapide." },
    { id: '3', author: "Sophie T.", rating: 5, comment: "Absolument magnifique ! La matière est divine et la couleur est encore plus belle en vrai." },
    { id: '4', author: "Marc V.", rating: 5, comment: "Un classique intemporel. L'investissement en vaut la peine." },
  ]);
  const [newReview, setNewReview] = useState({ author: '', comment: '', rating: 5 });
  const [showReviewForm, setShowReviewForm] = useState(false);


  if (!product) {
    notFound();
  }
  
  const productName = t(product.name);
  const productDescription = t(product.description);
  const productDetails = product.details ? t(product.details) : '';

  const handleAddToCart = () => {
    if (!product) return;
    addToCart({
      ...product,
      options: {
        ...product.options,
        selectedColor: selectedColor,
        selectedSize: selectedSize
      }
    });
    toast({
      title: "Article ajouté au panier",
      description: `${productName} a été ajouté à votre panier.`,
    });
  }

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newReview.author && newReview.comment) {
      setReviews(prev => [...prev, { ...newReview, id: Date.now().toString() }]);
      setNewReview({ author: '', comment: '', rating: 5 });
      setShowReviewForm(false);
      toast({
        title: t('product_page.toast.review_submitted_title'),
        description: t('product_page.toast.review_submitted_desc'),
      });
    }
  };


  return (
    <div className="container mx-auto py-12 md:py-16">
      <div className="grid md:grid-cols-2 gap-8 lg:gap-16">
        <div className="flex justify-center items-start">
            <div className="sticky top-24 w-full max-w-md rounded-lg overflow-hidden shadow-lg bg-card">
                <Image
                    src={product.imageUrl}
                    alt={productName}
                    width={product.width}
                    height={product.height}
                    className="w-full h-auto object-cover aspect-[3/4]"
                    data-ai-hint={product.imageHint}
                    priority
                />
            </div>
        </div>

        <div className="flex flex-col">
          <h1 className="text-3xl md:text-4xl font-bold">{productName}</h1>
          <div className="flex items-center gap-2 mt-2">
            <div className="flex items-center">
                {[...Array(5)].map((_, i) => <Star key={i} className={`w-5 h-5 ${i < 4 ? 'text-accent fill-accent' : 'text-muted-foreground'}`}/>)}
            </div>
            <span className="text-sm text-muted-foreground">({reviews.length} {t('product_page.reviews_count')})</span>
          </div>
          <p className="text-3xl font-bold text-primary mt-4">{product.price.toFixed(2)} €</p>
          <p className="mt-4 text-muted-foreground leading-relaxed">{productDescription}</p>
          
          <Separator className="my-8" />

          {product.options?.colors && (
            <div className="mb-6">
              <h3 className="text-sm font-semibold text-muted-foreground mb-2">{t('product_page.color')}: <span className="font-bold text-foreground">{selectedColor}</span></h3>
              <div className="flex items-center gap-3">
                {product.options.colors.map(color => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={cn(
                      "w-8 h-8 rounded-full border-2 transition-transform duration-200",
                      selectedColor === color ? 'border-primary scale-110' : 'border-border'
                    )}
                    style={{ backgroundColor: color }}
                    aria-label={`${t('product_page.select_color')} ${color}`}
                  />
                ))}
              </div>
            </div>
          )}

          {product.options?.sizes && (
             <div className="mb-6">
                <h3 className="text-sm font-semibold text-muted-foreground mb-2">{t('product_page.size')}</h3>
                <div className="flex flex-wrap items-center gap-2">
                  {product.options.sizes.map(size => (
                    <Button
                      key={size}
                      variant={selectedSize === size ? 'default' : 'outline'}
                      onClick={() => setSelectedSize(size)}
                      className="min-w-[40px]"
                    >
                      {size}
                    </Button>
                  ))}
                </div>
              </div>
          )}

          <div className="flex flex-col sm:flex-row gap-4">
            <Button size="lg" className="w-full sm:w-auto flex-grow" onClick={handleAddToCart}>
              <ShoppingCart className="mr-2 h-5 w-5" /> {t('product_page.add_to_cart')}
            </Button>
            <Button disabled={isFavoriteLoading} variant={isFavorite ? "secondary" : "outline"} size="lg" className="w-full sm:w-auto" aria-label={t('product_page.add_to_favorites')} onClick={handleFavoriteClick}>
              {isFavorite ? <CheckCircle className="mr-2 h-5 w-5 text-green-500"/> : <Heart className="mr-2 h-5 w-5" />}
              {isFavorite ? t('product_page.favorited') : t('product_page.favorite')}
            </Button>
          </div>

          <Accordion type="single" collapsible className="w-full mt-8">
            <AccordionItem value="item-1">
              <AccordionTrigger className="font-semibold">{t('product_page.details_care')}</AccordionTrigger>
              <AccordionContent>
                <p className="text-muted-foreground">{productDetails || t('product_page.default_details')}</p>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger className="font-semibold">{t('product_page.shipping_returns')}</AccordionTrigger>
              <AccordionContent>
                <p className="text-muted-foreground">{t('product_page.shipping_details')}</p>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
      
      <div className="mt-16 md:mt-24">
        <h2 className="text-2xl font-bold mb-6">{t('product_page.customer_reviews')}</h2>
        <Card>
            <CardHeader>
                <div className="flex justify-between items-center">
                    <CardTitle>{t('product_page.what_customers_say')}</CardTitle>
                    <Button variant="outline" onClick={() => setShowReviewForm(!showReviewForm)}>
                        {showReviewForm ? t('product_page.cancel_review') : t('product_page.write_review')}
                    </Button>
                </div>
            </CardHeader>
            <CardContent className="space-y-6">
                {showReviewForm && (
                    <form onSubmit={handleReviewSubmit} className="p-6 border rounded-lg bg-muted/50 space-y-4">
                         <h3 className="font-semibold text-lg">{t('product_page.share_opinion')}</h3>
                        <div className="grid sm:grid-cols-2 gap-4">
                            <div>
                                <Label htmlFor="author">{t('product_page.your_name')}</Label>
                                <Input id="author" value={newReview.author} onChange={e => setNewReview({...newReview, author: e.target.value})} placeholder={t('product_page.name_placeholder')} required/>
                            </div>
                            <div>
                                <Label htmlFor="rating">{t('product_page.your_rating')}</Label>
                                <div className="flex">
                                    {[...Array(5)].map((_, i) => (
                                        <Star key={i} onClick={() => setNewReview({...newReview, rating: i + 1})} className={cn("w-6 h-6 cursor-pointer", i < newReview.rating ? 'text-accent fill-accent' : 'text-muted-foreground')}/>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div>
                            <Label htmlFor="comment">{t('product_page.your_comment')}</Label>
                            <Textarea id="comment" value={newReview.comment} onChange={e => setNewReview({...newReview, comment: e.target.value})} placeholder={t('product_page.comment_placeholder')} required />
                        </div>
                        <Button type="submit">{t('product_page.submit_review')}</Button>
                    </form>
                )}

                {reviews.length > 0 ? (
                    reviews.map(review => (
                        <div key={review.id} className="border-t pt-6">
                            <div className="flex items-center mb-2">
                                <div className="flex items-center">
                                    {[...Array(5)].map((_, i) => <Star key={i} className={`w-4 h-4 ${i < review.rating ? 'text-accent fill-accent' : 'text-muted-foreground'}`}/>)}
                                </div>
                                <p className="ml-4 font-bold">{review.author}</p>
                            </div>
                            <p className="text-muted-foreground">{review.comment}</p>
                        </div>
                    ))
                ) : (
                    !showReviewForm && <p className="text-muted-foreground text-center py-8">{t('product_page.be_the_first_review')}</p>
                )}
            </CardContent>
        </Card>
      </div>
    </div>
  );
}
