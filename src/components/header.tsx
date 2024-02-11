import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { navigationMenuTriggerStyle } from "@/components/ui/navigation-menu";
import { Separator } from "./ui/separator";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { DefaultRoutes } from "@/routes/routes";
import { ProfileModal } from "./profile-modal";

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
              <NavigationMenuLink
                onClick={() => navigation(DefaultRoutes.NEW_ASSET)}
                active={location === DefaultRoutes.NEW_ASSET}
                className={navigationMenuTriggerStyle()}
              >
                Adicionar Ativo
              </NavigationMenuLink>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                Orçamento Doméstico
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        <ProfileModal />
      </div>
      <Separator />
      <Outlet />
    </div>
  );
};
