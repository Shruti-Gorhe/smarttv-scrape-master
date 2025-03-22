
import React, { useState } from 'react';
import { useToast } from "@/components/ui/use-toast";
import ScraperInput from '@/components/ScraperInput';
import ProductDisplay from '@/components/ProductDisplay';
import LoadingIndicator from '@/components/LoadingIndicator';
import { scrapeAmazonProduct, ProductData } from '@/utils/scraperService';

const Index = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [productData, setProductData] = useState<ProductData | null>(null);

  const handleScrape = async (url: string) => {
    setIsLoading(true);
    setProductData(null);
    
    try {
      const data = await scrapeAmazonProduct(url);
      setProductData(data);
      toast({
        title: "Scraping Complete",
        description: "Successfully extracted product information",
      });
    } catch (error) {
      console.error('Error in handleScrape:', error);
      toast({
        title: "Scraping Failed",
        description: "Unable to extract product information. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/30">
      <div className="container px-4 py-12 mx-auto">
        <div className="space-y-8">
          {/* Header */}
          <div className="text-center space-y-2 animate-fade-in">
            <h1 className="text-3xl font-medium tracking-tight sm:text-4xl">
              Smart TV Scraper
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Extract detailed information from any Amazon India Smart TV product page
            </p>
          </div>
          
          {/* Input Form */}
          <ScraperInput 
            onSubmit={handleScrape} 
            isLoading={isLoading} 
          />
          
          {/* Loading State */}
          {isLoading && (
            <div className="py-16 flex justify-center">
              <LoadingIndicator 
                size="lg" 
                text="Scraping product details, please wait..." 
              />
            </div>
          )}
          
          {/* Results */}
          {!isLoading && productData && (
            <ProductDisplay data={productData} />
          )}
          
          {/* Empty State */}
          {!isLoading && !productData && (
            <div className="py-16 text-center text-muted-foreground animate-fade-in">
              Enter an Amazon Smart TV product URL above to see detailed information
            </div>
          )}
        </div>
      </div>
      
      {/* Footer */}
      <footer className="py-6 border-t border-secondary/50">
        <div className="container px-4 text-center text-sm text-muted-foreground">
          This is a demo application. In a production environment, web scraping should be done server-side 
          and comply with the website's terms of service.
        </div>
      </footer>
    </div>
  );
};

export default Index;
