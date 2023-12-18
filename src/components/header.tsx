import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { navigationMenuTriggerStyle } from "@/components/ui/navigation-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "./ui/separator";
import { useLocation, useNavigate } from "react-router-dom";
import { DefaultRoutes } from "@/routes/routes";

export const Header = () => {
  const location = useLocation().pathname;
  const navigation = useNavigate();
  return (
    <div className="flex flex-col">
      <div className="flex p-4  justify-between mr-6">
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuLink
                className={navigationMenuTriggerStyle()}
                onClick={() => navigation(DefaultRoutes.APP_ROOT)}
                active={location === DefaultRoutes.APP_ROOT}
              >
                Home
              </NavigationMenuLink>
              <NavigationMenuLink
                onClick={() => navigation(DefaultRoutes.WALLET)}
                active={location === DefaultRoutes.WALLET}
                className={navigationMenuTriggerStyle()}
              >
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
