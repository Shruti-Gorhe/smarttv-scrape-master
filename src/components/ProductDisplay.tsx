
import React, { useState } from 'react';
import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

interface ProductData {
  name: string;
  rating: string;
  ratingCount: string;
  price: string;
  discount: string;
  bankOffers: string[];
  aboutItem: string[];
  productInfo: Record<string, string>;
  images: string[];
  manufacturerImages: string[];
  aiReviewSummary: string;
}

interface ProductDisplayProps {
  data: ProductData;
  className?: string;
}

const ProductDisplay = ({ data, className }: ProductDisplayProps) => {
  const [activeImage, setActiveImage] = useState<string | null>(data.images.length > 0 ? data.images[0] : null);
  const [imagesLoaded, setImagesLoaded] = useState<Record<string, boolean>>({});

  const handleImageLoad = (imageUrl: string) => {
    setImagesLoaded(prev => ({ ...prev, [imageUrl]: true }));
  };

  return (
    <div className={cn("w-full max-w-5xl mx-auto space-y-6 animate-slide-up", className)}>
      <Card className="overflow-hidden shadow-sm border-secondary/30">
        <CardHeader className="pb-4 pt-6">
          <div className="flex flex-col gap-2">
            <div>
              <h1 className="text-2xl font-medium truncate">{data.name}</h1>
              <div className="flex items-center gap-2 mt-2">
                <Badge variant="secondary" className="px-2 py-1">
                  ★ {data.rating}
                </Badge>
                <span className="text-sm text-muted-foreground">
                  ({data.ratingCount} ratings)
                </span>
              </div>
            </div>
            <div className="flex items-baseline gap-3 mt-1">
              <span className="text-2xl font-medium">{data.price}</span>
              {data.discount && (
                <Badge variant="destructive" className="font-normal">
                  {data.discount} OFF
                </Badge>
              )}
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <Tabs defaultValue="details" className="w-full">
            <TabsList className="w-full justify-start px-6 h-12 bg-muted/50">
              <TabsTrigger value="details" className="text-sm">Product Details</TabsTrigger>
              <TabsTrigger value="images" className="text-sm">Images</TabsTrigger>
              <TabsTrigger value="reviews" className="text-sm">AI Review Summary</TabsTrigger>
            </TabsList>
            
            <TabsContent value="details" className="p-6">
              <div className="space-y-6">
                {data.bankOffers.length > 0 && (
                  <div className="space-y-3">
                    <h3 className="font-medium">Bank Offers</h3>
                    <ul className="space-y-2">
                      {data.bankOffers.map((offer, index) => (
                        <li key={index} className="text-sm bg-secondary/50 rounded-md p-3">
                          {offer}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                
                {data.aboutItem.length > 0 && (
                  <div className="space-y-3">
                    <h3 className="font-medium">About This Item</h3>
                    <ul className="space-y-2 list-disc pl-5">
                      {data.aboutItem.map((point, index) => (
                        <li key={index} className="text-sm">
                          {point}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                
                {Object.keys(data.productInfo).length > 0 && (
                  <div className="space-y-3">
                    <h3 className="font-medium">Product Information</h3>
                    <div className="overflow-hidden rounded-md border">
                      <table className="w-full">
                        <tbody>
                          {Object.entries(data.productInfo).map(([key, value], index) => (
                            <tr key={index} className={index % 2 === 0 ? 'bg-secondary/30' : ''}>
                              <td className="p-2 border-r text-sm font-medium">{key}</td>
                              <td className="p-2 text-sm">{value}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
              </div>
            </TabsContent>
            
            <TabsContent value="images" className="pb-6">
              <div className="p-6 pb-3">
                <h3 className="font-medium mb-4">Product Images</h3>
                
                {data.images.length > 0 && (
                  <div className="flex flex-col gap-4">
                    {activeImage && (
                      <div className="relative bg-secondary/30 rounded-lg aspect-video flex items-center justify-center overflow-hidden">
                        <div className={cn(
                          "absolute inset-0 flex items-center justify-center",
                          !imagesLoaded[activeImage] && "shimmer"
                        )}>
                          {!imagesLoaded[activeImage] && <span className="sr-only">Loading...</span>}
                        </div>
                        <img
                          src={activeImage}
                          alt={data.name}
                          className={cn(
                            "max-h-full max-w-full object-contain transition-opacity duration-300",
                            imagesLoaded[activeImage] ? "opacity-100" : "opacity-0"
                          )}
                          onLoad={() => handleImageLoad(activeImage)}
                        />
                      </div>
                    )}
                    
                    <div className="grid grid-cols-5 sm:grid-cols-8 gap-2">
                      {data.images.map((image, index) => (
                        <button
                          key={index}
                          onClick={() => setActiveImage(image)}
                          className={cn(
                            "relative aspect-square rounded-md overflow-hidden border-2 transition-all duration-200",
                            activeImage === image 
                              ? "border-primary" 
                              : "border-transparent hover:border-primary/50"
                          )}
                        >
                          <div className={cn(
                            "absolute inset-0",
                            !imagesLoaded[image] && "shimmer"
                          )} />
                          <img
                            src={image}
                            alt={`Thumbnail ${index + 1}`}
                            className={cn(
                              "w-full h-full object-cover transition-opacity duration-300",
                              imagesLoaded[image] ? "opacity-100" : "opacity-0"
                            )}
                            onLoad={() => handleImageLoad(image)}
                          />
                        </button>
                      ))}
                    </div>
                  </div>
                )}
                
                {data.manufacturerImages.length > 0 && (
                  <div className="mt-8">
                    <h3 className="font-medium mb-4">From the Manufacturer</h3>
                    <Accordion type="single" collapsible className="w-full">
                      <AccordionItem value="manufacturer-images">
                        <AccordionTrigger className="text-sm">
                          View Manufacturer Images
                        </AccordionTrigger>
                        <AccordionContent>
                          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 mt-3">
                            {data.manufacturerImages.map((image, index) => (
                              <div 
                                key={index} 
                                className="relative aspect-video rounded-md overflow-hidden bg-secondary/30"
                                onClick={() => setActiveImage(image)}
                              >
                                <div className={cn(
                                  "absolute inset-0",
                                  !imagesLoaded[image] && "shimmer"
                                )} />
                                <img
                                  src={image}
                                  alt={`Manufacturer Image ${index + 1}`}
                                  className={cn(
                                    "w-full h-full object-cover hover:scale-105 transition-transform duration-300 cursor-pointer",
                                    imagesLoaded[image] ? "opacity-100" : "opacity-0"
                                  )}
                                  onLoad={() => handleImageLoad(image)}
                                />
                              </div>
                            ))}
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  </div>
                )}
              </div>
            </TabsContent>
            
            <TabsContent value="reviews" className="p-6">
              {data.aiReviewSummary ? (
                <div className="space-y-4">
                  <h3 className="font-medium">AI-Generated Review Summary</h3>
                  <div className="bg-secondary/40 rounded-lg p-4 text-sm">
                    {data.aiReviewSummary}
                  </div>
                </div>
              ) : (
                <div className="text-center py-10 text-muted-foreground">
                  No AI review summary available
                </div>
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProductDisplay;
