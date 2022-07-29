import { Center, Spinner } from "native-base";

export function Loading() {
  return (
    <Center flex={1} bg="gray.700">
      <Spinner color="secondary.700" w={"16"} h={"16"} />
    </Center>
  )
}