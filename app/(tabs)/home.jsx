import { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { FlatList, Image, RefreshControl, Text, View } from "react-native";

import { icons, images } from "../../constants";
import { CustomButton, EmptyState, SearchInput } from "../../components";
import { ShipCard } from "../../components/ShipCard";
import { Sheet, useSheetRef } from "../../components/Sheet";

const fetchShipments = async () => {
  try {
    const response = await fetch(
      'https://shippex-demo.bc.brandimic.com/api/method/frappe.client.get_list?doctype=AWB&fields=["*"]',
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const json = await response.json();
    console.log(json.message);
    console.log("Response status:", response.status);
    if (!response.ok) {
      console.error("Network response was not ok:", response.statusText);
    }
    return json.message;
  } catch (error) {
    console.error(error);
    return [];
  }
};

const Home = () => {
  const [shipments, setShipments] = useState([]);

  useEffect(() => {
    const loadShipments = async () => {
      const data = await fetchShipments();
      setShipments(data);
    };

    loadShipments();
  }, []);

  useEffect(() => {
    console.log("Shipments Data:", shipments);
  }, [shipments]);

  const [refreshing, setRefreshing] = useState(false);
  const bottomSheetModalRef = useSheetRef();

  const onRefresh = async () => {
    setRefreshing(true);
    const data = await fetchShipments();
    setShipments(data);
    setRefreshing(false);
  };

  return (
    <SafeAreaView className="bg-white">
      <FlatList
        data={shipments}
        keyExtractor={(item) => item.name.toString()}
        className="bg-white"
        renderItem={({ item }) => (
          <ShipCard
            name={item.name}
            company={item.company}
            destination_zone={item.destination_zone}
            origin_zone={item.origin_zone}
            destination_state={item.destination_state}
            status={item.status}
            type={item.type}
            date={item.date}
            time={item.time}
          />
        )}
        ListHeaderComponent={() => (
          <View className="flex my-6 px-4 space-y-6">
            <View className="flex justify-between items-start flex-row ">
              <View>
                <Image
                  source={icons.avatar}
                  className="w-12 h-12"
                  resizeMode="contain"
                />
              </View>

              <View>
                <Image
                  source={images.logoLight}
                  className="w-24 h-12"
                  resizeMode="contain"
                />
              </View>

              <View>
                <Image
                  source={icons.bell}
                  className="w-12 h-12"
                  resizeMode="contain"
                />
              </View>
            </View>

            <View className="flex flex-col space-y-1 mt-5 mb-8">
              <Text className="text-lg font-pregular text-gray-100 ">
                Hello,
              </Text>

              <Text className="text-2xl font-psemibold text-gray-800 ">
                Ibrahim Shakar
              </Text>
            </View>

            <SearchInput />

            <View className="mt-8 flex space-x-2  flex-row justify-between items-center">
              <CustomButton
                title="Filter"
                iconName="filter"
                iconPosition="left"
                showIcon={true}
                containerStyles="w-1/2 mr-2  bg-secondary-300 text-primary"
                textStyles="text-[#A7A3B3]"
                onPress={() => bottomSheetModalRef.current?.present()}
              />

              <CustomButton
                title="Scan"
                iconName="scan"
                iconPosition="left"
                showIcon={true}
                containerStyles="w-1/2  bg-secondary text-secondary"
                textStyles="text-secondary-100"
              />
            </View>

            <Sheet ref={bottomSheetModalRef} snapPoints={[200]}>
              <View className="flex-1 items-center justify-center pb-8">
                <Text className="text">some text</Text>
              </View>
            </Sheet>

            <View className="flex flex-row items-center justify-between mt-8 ">
              <Text className="text-lg font-psemibold ">Shipments</Text>
              <Text className="text-sm font-pregular text-secondary">
                Mark All
              </Text>
            </View>
          </View>
        )}
        ListEmptyComponent={() => (
          <EmptyState
            title="No Shipments Found"
            subtitle="No shipments created yet"
          />
        )}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    </SafeAreaView>
  );
};

export default Home;
