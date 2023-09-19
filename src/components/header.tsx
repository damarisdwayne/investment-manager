import { Box } from "@damaris-ui/core";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { navigationMenuTriggerStyle } from "@/components/ui/navigation-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export const Header = () => {
  return (
    <Box
      withPadding
      flexDirection="row"
      alignItems="center"
      justifyContent="space-between"
    >
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
    </Box>
  );
};
