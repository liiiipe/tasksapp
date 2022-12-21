import { Alert, Box, CloseIcon, Collapse, HStack, IconButton, Text, VStack } from "native-base";

interface AlertErrorProps {
  show: boolean;
  setShow: (value: boolean) => void;
}

export function AlertError({ show, setShow }: AlertErrorProps) {
  if (!show) {
    return null;
  }

  return (
    <Box
      alignItems="center"
      position="absolute"
      bottom="7"
      right="5"
    >
      <Alert status="error">
        <VStack>
          <HStack flexShrink={1} space={2} alignItems="center" justifyContent="space-between">
            <HStack flexShrink={1} space={2} alignItems="center">
              <Alert.Icon />
              <Text
                fontSize="md"
                fontWeight="medium"
                _dark={{
                  color: "coolGray.800"
                }}
              >
                Ops, ocorreu um erro :(
              </Text>
            </HStack>
            <IconButton
              variant="unstyled"
              _focus={{
                borderWidth: 0
              }}
              icon={<CloseIcon size="3" />}
              _icon={{
                color: "coolGray.600"
              }}
              onPress={() => setShow(false)}
            />
          </HStack>
          <Box
            pl="6"
            _dark={{
              _text: {
                color: "coolGray.600"
              }
            }}
          >
            A ação não pôde ser processada no momento. Tente novamente mais tarde!
          </Box>
        </VStack>
      </Alert>
    </Box>
  );
}