import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Star, ShoppingCart, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface DesignCardProps {
  title: string;
  author: string;
  image: string;
  rating: number;
  purchases: number;
}

export function DesignCard({ title, author, image, rating, purchases }: DesignCardProps) {
  return (
    <Card className="overflow-hidden transition-all hover:shadow-lg">
      <CardHeader className="p-0">
        <img
          src={image}
          alt={title}
          className="h-48 w-full object-cover"
        />
      </CardHeader>
      <CardContent className="p-4">
        <h3 className="font-semibold text-lg">{title}</h3>
        <p className="text-sm text-gray-500">by {author}</p>
      </CardContent>
      <CardFooter className="flex justify-between p-4 bg-secondary/50">
        <Button variant="ghost" size="sm" className="flex gap-1">
          <Star className="h-4 w-4" />
          <span>{rating.toFixed(1)}</span>
        </Button>
        <Button variant="ghost" size="sm" className="flex gap-1">
          <ShoppingCart className="h-4 w-4" />
          <span>{purchases}</span>
        </Button>
        <Button variant="ghost" size="sm">
          <Share2 className="h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
}