import { HStack, IconButton, useColorMode, useColorModeValue, useTheme } from "native-base";
import { Moon, SunDim } from "phosphor-react-native";

import Logo from "../assets/logo_secondary.svg";

export function HeaderHome() {
  const { colors } = useTheme();
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <HStack
      w="full"
      justifyContent="space-between"
      alignItems="center"
      bg={useColorModeValue("gray.400", "gray.600")}
      pt={12}
      py={2}
      px={6}
    >
      <Logo />
      <IconButton
        onPress={toggleColorMode}
        icon={
          colorMode === 'light' ?
            <Moon size={26} color={colors.gray[300]} />
            :
            <SunDim size={26} color={colors.gray[300]} />
        }
      />
    </HStack>
  )
}