"use client";

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { LucideAlignJustify } from "lucide-react"
import { TbWorld } from "react-icons/tb";

export const categories = [
    {
      category: "Books",
      subcategories: ["Biography", "Spirituality", "Philosophy", "Religious Texts"]
    },
    {
      category: "Art",
      subcategories: ["Wall Paintings", "Sculptures", "Calligraphy", "Photographs"]
    },
    {
      category: "Decor",
      subcategories: ["Wall Hangings", "Figurines", "Candles", "Lamps"]
    },
    {
      category: "Clothing",
      subcategories: ["Traditional Wear", "Accessories", "Scarves", "Jewelry"]
    },
    {
      category: "Music",
      subcategories: ["CDs", "Instruments", "Vinyl", "Digital Downloads"]
    },
    {
      category: "Meditation",
      subcategories: ["Mats", "Incense", "Cushions", "Music"]
    },
    {
      category: "Jewelry",
      subcategories: ["Necklaces", "Bracelets", "Rings", "Earrings"]
    },
    {
      category: "Gifts",
      subcategories: ["Gift Cards", "Gift Sets", "Special Occasion Gifts"]
    },
    {
      category: "Food",
      subcategories: ["Snacks", "Beverages", "Herbs", "Spices"]
    }
];

const CategoryBox = () => {
    return (
        <div className="flex items-center justify-between gap-x-1">
          <div>
              <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                      <Button variant={"ghost"} className="h-8 w-full flex p-2">
                            <LucideAlignJustify className="h-4 w-4 mr-1" />
                      </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                      <DropdownMenuLabel>Categories</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuGroup>
                          {categories.map((category) => (
                            <DropdownMenuSub key={category.category}>
                              <DropdownMenuSubTrigger>{category.category}</DropdownMenuSubTrigger>
                              <DropdownMenuPortal>
                                <DropdownMenuSubContent>
                                  {category.subcategories.map((subcategory) => (
                                    <DropdownMenuItem key={subcategory}>{subcategory}</DropdownMenuItem>
                                  ))}
                                </DropdownMenuSubContent>
                              </DropdownMenuPortal>
                            </DropdownMenuSub>
                          ))}
                      </DropdownMenuGroup>
                  </DropdownMenuContent>
              </DropdownMenu>
          </div>
        </div>
    );
}
 
export default CategoryBox;