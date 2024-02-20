import { View, Image, Text, StyleSheet,KeyboardAvoidingView, Platform ,StatusBar,ScrollView,TouchableOpacity} from 'react-native';
import { Appbar, ThemeProvider } from 'react-native-paper';
import React from "react";
import { useNavigation } from "@react-navigation/native";
//import { Avatar } from 'react-native-paper';
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Headersection from "../components/Headersection";




export default function TemplateView() {
  const navigation = useNavigation();
  const handlePlantation = () => {
    navigation.navigate("Plantation");
  };

  const handleFence = () => {
    navigation.navigate("Fence");
  };


    const ClearLandIcon = (props) => (
      <MaterialCommunityIcons {...props} name='palm-tree' size={25} color='white' />
    );
    
    const PlantationIcon = (props) => (
      <MaterialCommunityIcons {...props} name='leaf' size={25} color='white' />
    );
    
    const FenceSetupIcon = (props) => (
      <MaterialCommunityIcons {...props} name='fence' size={25} color='white' />
    );
    
    const TypeIcon = (props) => (
      <MaterialCommunityIcons
        {...props}
        name='file-document'
        size={25}
        color='grey'
      />
    );
    const PerimeterIcon = (props) => (
      <MaterialCommunityIcons
        {...props}
        name='border-none-variant'
        size={25}
        color='grey'
      />
    );

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "margin"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 10 : 0}
    >
      {/* Static section at the top */}
      <StatusBar barStyle="light-content" backgroundColor="#007BFF" />

      <Headersection navigation={navigation} title="Template View" />

         {/* Scrollable content */}
      <ScrollView contentContainerStyle={styles.scrollContent}>
      
      <View style={styles.low_outer}>
        <View style={styles.imageView}>
          <Image
            source={{ uri: 'https://i.ibb.co/9TQd2Bb/map-image.jpg' }}
            style={styles.imageStyling}
          />
        </View>
        {/* icons_block */}
        <View style={styles.iconBlockStyling}>
          <View style={styles.iconBlockInner}>
            <View style={styles.iconOuter_01}>
              <TouchableOpacity ><ClearLandIcon /></TouchableOpacity>
            </View>
            <Text>Clear land</Text>
          </View>
          <View style={styles.iconBlockInner}>
            <View style={styles.iconOuter_02}>
            <TouchableOpacity onPress={handlePlantation}><PlantationIcon /></TouchableOpacity>
            </View>
            <Text>Plantation</Text>
          </View>
          <View style={styles.iconBlockInner}>
            <View style={styles.iconOuter_03}>
            <TouchableOpacity onPress={handleFence}><FenceSetupIcon /></TouchableOpacity>
            </View>
            <Text>Fence setup</Text>
          </View>
        </View>
        {/* info_block */}
        <View style={styles.infoBlock}>
          <View>
            <Text style={styles.text02Styling}>Land Type</Text>
          </View>
          <View style={styles.rowView}>
            <View style={styles.firstDouble}>
              <View style={styles.blockView}>
              <MaterialCommunityIcons name="island"  size={36} color="#65676B"/>
                <View style={styles.textView}>
                  <Text style={styles.text01Styling}>Type</Text>
                  <Text style={styles.text02Styling}>Flat</Text>
                </View>
              </View>
              <View style={styles.blockView}>
              <MaterialCommunityIcons name="vector-square"  size={36} color="#65676B"/>
                <View style={styles.textView}>
                  <Text style={styles.text01Styling}>Perimeter</Text>
                  <Text style={styles.text02Styling}>13km</Text>
                </View>
              </View>
            </View>
            <View style={styles.secondDouble}>
              <View style={styles.blockView}>
              <MaterialCommunityIcons name="texture-box"  size={36} color="#65676B"/>
                <View style={styles.textView}>
                  <Text style={styles.text01Styling}>Area</Text>
                  <Text style={styles.text02Styling}>100 Acres</Text>
                </View>
              </View>
              <View style={styles.blockView}>
              <MaterialCommunityIcons name="map-marker"  size={36} color="#65676B"/>
                <View style={styles.textView}>
                  <Text style={styles.text01Styling}>Location</Text>
                  <Text style={styles.text02Styling}>Kandy</Text>
                </View>
              </View>
            </View>
          </View>
        </View>

      { /* <View style={styles.box} >
      <View style={styles.box4} >
      <View style={styles.innerContainer}>

      <Text style={styles.titleText}>Plantation Info</Text>
      <Text style={styles.DescriptionText}>Prime acreage for dream homes or sustainable ventures. Breathtaking views, fertile soil, and diverse terrain offer endless possibilities acreageomhs.</Text>

      </View>
      </View>
  </View>*/}
      </View>

      

     

      </ScrollView>

    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({


  container: {
    flex: 1,
  },
    testingText: {
      color: 'red',
    },
    low_outer: {
      height: '100%',
    },

    imageView: {
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 20,
    },
    imageStyling: {
      width: 320,
      height: 300,
      borderRadius: 20,
    },
    iconBlockStyling: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      alignItems: 'center',
      marginTop: 25,
      paddingHorizontal: 35,
    },
    iconBlockInner: {
      alignItems: 'center',
    },
    iconOuter_01: {
      backgroundColor: '#655757',
      borderRadius: 1000,
      padding: 10,
    },
    iconOuter_02: {
      backgroundColor: '#3AA859',
      borderRadius: 100,
      padding: 10,
    },
    iconOuter_03: {
      backgroundColor: '#5452CC',
      borderRadius: 100,
      padding: 10,
    },
    infoBlock: {
      backgroundColor: 'white',
      marginTop: 20,
      marginHorizontal: 30,
      borderRadius: 10,
      padding: 10,
    },
    landInfoView: {
      backgroundColor: 'red',
    },
    infoView: {
      backgroundColor: 'lightblue',
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-around',
    },
    infoTop: {},
    infoBottom: {},
    blockView: {
      flexDirection: 'row',
      marginLeft: 20,
      marginVertical: 10,
    },
    textView: {
      marginLeft: 10,
    },
    text01Styling: {
      color: '#65676B',
      fontWeight: 'bold',
    },
    text02Styling: {
      color: 'black',
      fontWeight: 'bold',
    },
    firstDouble: {},
    secondDouble: {},
    rowView: {
      flexDirection: 'row',
    },


    box: {
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
    },

    box4:{
      width: "87%",
      height: 100,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "white",
      marginTop: 10,
      borderRadius: 11,
    },
  
    DescriptionText:{
      marginLeft: 16,
      fontSize: 13,
      marginTop: 5,
    },

    innerContainer: {
      width: "100%",
      height: "85%",
      backgroundColor: "white",
    },
  });