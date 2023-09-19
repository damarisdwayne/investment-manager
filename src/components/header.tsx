import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { navigationMenuTriggerStyle } from "@/components/ui/navigation-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "./ui/separator";

export const Header = () => {
  return (
    <div className="flex flex-col">
      <div className="flex p-4  justify-between">
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuLink
                className={navigationMenuTriggerStyle()}
                onClick={() => alert("sdas")}
              >
                Home
              </NavigationMenuLink>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                Carteira
              </NavigationMenuLink>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                Orçamento Doméstico
              </NavigationMenuLink>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                Diagrama
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        <Avatar>
          <AvatarImage />
          <AvatarFallback>DW</AvatarFallback>
        </Avatar>
      </div>
      <Separator />
    </div>
  );
};
