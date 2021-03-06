import { Layout } from '@/components/common';
import { NLink, IncrementNumber, Image } from '@/components/ui';
import { numberToPrice } from '@/utils/format'
import { getTotalPrice, getPriceByItem, getSaleByItem } from '@/utils/cart'
import { Box, Container, Heading, List, ListItem, Stack, Text, Button, Divider, GridItem, Flex, Grid, Link, Input, Checkbox, Icon, IconButton, HStack, Spacer, Badge, FormControl, FormLabel } from '@chakra-ui/react';
import { useState } from 'react';
import { useAppSelector, useAppDispatch } from '@/hook/redux';
import { incrementQuantity, decrementQuantity, removeFromCart } from '@/lib/redux/slice/cart';
import { NextPage } from 'next';
import { FiDelete, FiHeart, FiTrash2 } from 'react-icons/fi';

const CartEmty = () => {
    return (
        <Stack
            as={Box}
            textAlign={'center'}
            spacing={{ base: 8, md: 14 }}
            py={{ base: 12, md: 24 }}>
            <Heading
                fontWeight={600}
                fontSize={{ base: 'xl', sm: '2xl', md: '3xl' }}
                lineHeight={'110%'}>
                <Text as={'span'} color={'gray.400'}>
                    Không có sản phẩm nào trong giỏ hàng của bạn!
                </Text>
            </Heading>
            <Stack
                direction={'column'}
                spacing={3}
                align={'center'}
                alignSelf={'center'}
                position={'relative'}>
                <NLink href={'/product'} chackraLink={{ _hover: { textDecoration: 'none' } }}>
                    <Button
                        colorScheme={'green'} bg={'gray.300'} rounded={'full'} px={6}
                        _hover={{ bg: 'green.500', }}>
                        Tiếp tục mua sắm
                    </Button>
                </NLink>
            </Stack>
        </Stack>
    )
}

const CartPage: NextPage = () => {
    /* const [checkedItems, setCheckedItems] = useState<string[]>([]) */
    const [promo, setPromo] = useState<string>('')
    const [priceSale, setPriceSale] = useState(0)
    const cart = useAppSelector((state) => state.cart)
    const dispatch = useAppDispatch()
    const AllTotalPrice = getTotalPrice(cart)

    return (
        <Layout>
            <Container maxW={'container.xl'} py='8' bg='gray.50'>
                {cart.length === 0
                    ? <CartEmty />
                    : <Grid gap='4' templateColumns='repeat(6, 1fr)'>
                        <GridItem as={List} colSpan={{ base: 6, lg: 4 }}>
                            <Stack bg='white' direction={'column'} shadow='md' rounded={'md'} border='none' borderColor={'transparent'}>
                                <Text w='full' p='2' fontSize='xl' bg='green.400' color='#ffffff' roundedTop={'md'}>Giỏ hàng</Text>
                                {/* <Stack px='1' py='1' direction='row' justifyContent='space-between' bg={'#F7FAFC'} shadow='sm' rounded='sm'>
                                    <Checkbox isChecked={checkedItems.length == cart.length}
                                        onChange={() => {
                                            if (checkedItems.length == cart.length) return setCheckedItems([])
                                            setCheckedItems(cart.map((item: { name: string }) => item.name))
                                        }}
                                        colorScheme='green' />
                                        <IconButton size={'xs'} aria-label='Del cart' fontSize='16px' icon={<FiTrash2 />} />
                                </Stack> */}
                                {cart.map((item: any, i: number) => (
                                    <Stack
                                        key={i}
                                        direction='row' p='2' justifyContent='space-between' alignItems='start'>
                                        <Flex gap='3' position={'relative'}>
                                            {/* <Checkbox isChecked={checkedItems.includes(item.name)}
                                                onChange={() => {
                                                    if (checkedItems.includes(item.name)) return setCheckedItems(checkedItems.filter(e => e != item.name))
                                                    setCheckedItems([...checkedItems, item.name])
                                                }}
                                                colorScheme='green' position={'absolute'} top='1' left='1' zIndex='banner' bg={'white'} rounded='md' /> */}
                                            <Image
                                                className='border-radius'
                                                width={'100px'}
                                                height={'100px'}
                                                layout='intrinsic'
                                                src={item.image.item}
                                                alt={'Cart item ' + item.name} />
                                            <Flex direction='column'>
                                                <NLink href={`/product/${item._id}`}>{item.name}</NLink>
                                                <Text color={'gray.500'} fontSize='sm'>Color, size</Text>
                                                <HStack>
                                                    {item.isSale.status
                                                        && <Badge variant='outline' colorScheme='green' rounded='md'>
                                                            {item.isSale.type== 'value'? 'SALE!' : `-${item.isSale.value}%`}
                                                        </Badge>}
                                                    <Text>{numberToPrice(getSaleByItem(item))}</Text>
                                                </HStack>
                                                <HStack maxW='320px'>
                                                    <Button size={'sm'} onClick={() => dispatch(decrementQuantity(item._id))}>-</Button>
                                                    <Input size={'sm'} maxW={16} value={item.quantity} onChange={() => { }} />
                                                    <Button size={'sm'} onClick={() => dispatch(incrementQuantity(item._id))}>+</Button>
                                                </HStack>
                                            </Flex>
                                        </Flex>
                                        <Stack direction='column' justifyContent={'end'} alignItems={'end'} height='100px'>
                                            <Spacer height='full' />
                                            <Text>{numberToPrice(getPriceByItem(item))}</Text>
                                            <Stack direction='row'>
                                                <IconButton
                                                    size={'sm'}
                                                    variant="outline"
                                                    onClick={() => dispatch(removeFromCart(item._id))}
                                                    aria-label="open menu"
                                                    icon={<FiTrash2 />}
                                                />
                                                <Divider orientation='vertical' colorScheme='gray' />
                                                <IconButton
                                                    size={'sm'}
                                                    variant="outline"
                                                    onClick={() => { }}
                                                    aria-label="open menu"
                                                    icon={<FiHeart />}
                                                />
                                            </Stack>
                                        </Stack>
                                    </Stack>
                                ))}
                            </Stack>
                        </GridItem>
                        <GridItem colSpan={{ base: 6, md: 6, lg: 2 }}>
                            <Stack direction={{ base: 'column', md: 'row', lg: 'column' }} gap='4' mb='4'>
                                <Stack gap={1} p='5' w={'full'} bg='white' shadow='md' rounded={'md'} >
                                    <Stack direction='row' justifyContent='space-between' alignItems={'end'}>
                                        <FormControl>
                                            <FormLabel>Áp dụng kuyến mãi</FormLabel>
                                            <Input placeholder='Nhập mã khuyễn mãi của bạn' bg={'blackAlpha.100'} type='text' value={promo} onChange={(e) => {
                                            setPromo(e.target.value)
                                        }} />
                                        </FormControl>
                                        <Button onClick={() => { }}>Lưu</Button>
                                    </Stack>
                                </Stack>
                                <Stack gap={2} p='5' w={'full'} bg='white' shadow='md' rounded={'md'} >
                                    <Flex justifyContent={'space-between'}>
                                        <Text>Tạm tính</Text>
                                        <Text>{numberToPrice(AllTotalPrice)}</Text>
                                    </Flex>
                                    <Flex justifyContent={'space-between'}>
                                        <Text>Giảm giá</Text>
                                        <Text>{numberToPrice(priceSale)}</Text>
                                    </Flex>
                                    <Divider colorScheme='gray' />
                                    <Flex justifyContent={'space-between'}>
                                        <Text>Tổng cộng</Text>
                                        <Text>{numberToPrice(priceSale + AllTotalPrice)}</Text>
                                    </Flex>
                                </Stack>
                            </Stack>
                            <Flex flex={1} justify={'end'} align={'center'} position={'relative'} w={'full'}>
                                <NLink href='/checkout' chackraLink={{
                                    _hover: { textDecoration: 'none' }
                                }}>
                                    <Button colorScheme={'green'}>Thanh toán</Button>
                                </NLink>
                            </Flex>
                        </GridItem>
                    </Grid>}
            </Container>
        </Layout>
    );
}

export default CartPage;