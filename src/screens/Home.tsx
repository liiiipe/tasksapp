import { useState } from 'react';

import { Center, FlatList, Heading, HStack, IconButton, Text, useTheme, VStack } from "native-base";
import { useNavigation } from '@react-navigation/native';
import { ChatTeardropText, Plus, SignOut } from "phosphor-react-native";

import { Filter } from "../components/Filter";
import { Order, OrderProps } from '../components/Order';
import Logo from "../assets/logo_secondary.svg";

export function Home() {
  const [statusSelected, setStatusSelected] = useState<'open' | 'closed'>('open');
  const [orders, setOrders] = useState<OrderProps[]>([
    {
      id: '456',
      patrimony: '123456',
      when: '18/07/2022 às 14:00',
      status: 'open'
    }
  ]);

  const navigation = useNavigation();
  const { colors } = useTheme();

  function handleNewOrder() {
    navigation.navigate('new');
  }

  function handleOpenDetails(orderId: string) {
    navigation.navigate('details', { orderId });
  }

  return (
    <VStack flex={1} pb={6} bg="gray.700" position="relative">
      <HStack
        w="full"
        justifyContent="space-between"
        alignItems="center"
        bg="gray.600"
        pt={12}
        py={2}
        px={6}
      >
        <Logo />
        <IconButton
          icon={<SignOut size={26} color={colors.gray[300]} />}
        />
      </HStack>
      <VStack flex={1} px={6}>
        <HStack w="full" mt={8} mb={4} justifyContent="space-between" alignItems="center">
          <Heading color="gray.100">Minhas Tarefas</Heading>
          <Text color="gray.200">
            {orders.length}
          </Text>
        </HStack>

        <HStack space={3} mb={8}>
          <Filter
            type="open"
            title="em andamento"
            onPress={() => setStatusSelected('open')}
            isActive={statusSelected === 'open'}
          />

          <Filter
            type="closed"
            title="finalizados"
            onPress={() => setStatusSelected('closed')}
            isActive={statusSelected === 'closed'}
          />
        </HStack>

        <FlatList
          data={orders.filter((item) => item.status === statusSelected)}
          keyExtractor={item => item.id}
          renderItem={({ item }) => <Order data={item} onPress={() => handleOpenDetails(item.id)} />}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 100 }}
          ListEmptyComponent={() => (
            <Center marginTop={5}>
              <ChatTeardropText color={colors.gray[300]} size={40} />
              <Text color="gray.300" fontSize="xl" mt={4} textAlign="center">
                Você ainda não possui {'\n'}
                tarefas {statusSelected === 'open' ? 'em andamento' : 'finalizadas'}
              </Text>
            </Center>
          )}
        />

      </VStack>

      <IconButton
        position="absolute"
        bottom={6}
        right={6}
        borderRadius="full"
        bg="green.300"
        variant="ghost"
        width={"16"}
        icon={<Plus color={colors.white} size={40} />}
        onPress={() => handleNewOrder()}
      />
    </VStack>
  )
}