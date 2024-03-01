import React, { useState, useEffect } from 'react';

import { TouchableOpacity, View, Text, Image, Button } from 'react-native';
import { Appbar } from 'react-native-paper';
import { styles } from './SavedTemplatesScreenStyles';
/* import AppLoading from 'expo-app-loading'; */
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { ScrollView } from 'react-native';

/* icons from materialcommunity icons */
const CustomEditIcon = (props) => {
  <MaterialCommunityIcons
    {...props}
    name='square-edit-outline'
    size={25}
    color='#65676B'
  />;
};
const CustomDeleteIcon = (props) => (
  <MaterialCommunityIcons
    {...props}
    name='trash-can-outline'
    size={25}
    color='#65676B'
  />
);

/* data */

const SavedTemplatesScreen = ({ navigation }) => {
  const templatesList = [
    {
      id: 1,
      name: 'Rubber estate',
      location: 'Kandy',
      date: '23/12/2024',
      time: '15:25',
    },
    {
      id: 2,
      name: 'Template 02',
      location: 'Colombo',
      date: '23/12/2024',
      time: '15:25',
    },
    {
      id: 3,
      name: 'Template 03',
      location: 'Galle',
      date: '23/12/2024',
      time: '15:25',
    },
    {
      id: 4,
      name: 'Template 04',
      location: 'Kandy',
      date: '23/12/2024',
      time: '15:25',
    },
    {
      id: 5,
      name: 'Template 05',
      location: 'Kandy',
      date: '23/12/2024',
      time: '15:25',
    },
    {
      id: 6,
      name: 'Template 06',
      location: 'Kandy',
      date: '23/12/2024',
      time: '15:25',
    },
    {
      id: 7,
      name: 'Template 07',
      location: 'Kandy',
      date: '23/12/2024',
      time: '15:25',
    },
    {
      id: 8,
      name: 'Template 08',
      location: 'Kandy',
      date: '23/12/2024',
      time: '15:25',
    },
    {
      id: 9,
      name: 'Tea estate',
      location: 'Kandy',
      date: '23/12/2024',
      time: '15:25',
    },
  ];
  const [templates, setTemplates] = useState(templatesList);

  const handleDelete = (deletingTemplate) => {
    const newTemplates = templates.filter((template) => {
      return template.id !== deletingTemplate.id;
    });
    setTemplates(newTemplates);
    console.log('delete item');
  };

  return (
    <>
      <View>
        {
          <Appbar.Header
            style={styles.top_Bar}
            dark={true}
            mode='center-aligned'
          >
            <Appbar.BackAction
              onPress={() => {
                navigation.navigate('SaveScreen');
              }}
            />
            <Appbar.Content title='Saved Templates' />
          </Appbar.Header>
        }
      </View>
      <View style={styles.low_outer}>
        {/* template */}
        <View style={styles.scrollViewOuterStyle}>
          <ScrollView style={{ flex: 1 }}>
            {templates.map((item, index) => {
              return (
                <View key={item.id} style={styles.template_style}>
                  <View style={styles.col_01}>
                    <TouchableOpacity
                      onPress={() => {
                        navigation.navigate('ResizeMap');
                      }}
                    >
                      <Image
                        style={styles.image_style}
                        source={{
                          uri: 'https://i.pcmag.com/imagery/articles/01IB0rgNa4lGMBlmLyi0VP6-6..v1611346416.png',
                        }}
                      />
                    </TouchableOpacity>
                  </View>
                  <TouchableOpacity
                    onPress={() => {
                      navigation.navigate('TemplateView');
                    }}
                  >
                    <View style={styles.col_02}>
                      <Text style={styles.bold_text}>{item.name}</Text>
                      <Text style={styles.sub_text_style}>
                        Location: {item.location}
                      </Text>
                      <Text style={styles.sub_text_style}>
                        Date: {item.date}{' '}
                      </Text>
                      <Text style={styles.sub_text_style}>
                        Time: {item.time}
                      </Text>
                    </View>
                  </TouchableOpacity>
                  <View style={styles.col_03}>
                    <MaterialCommunityIcons
                      name='square-edit-outline'
                      size={25}
                      color='#65676B'
                      onPress={() => {
                        navigation.navigate('EditTemplate');
                      }}
                    />
                    <CustomDeleteIcon onPress={() => handleDelete(item)} />
                  </View>
                </View>
              );
            })}
          </ScrollView>
        </View>
      </View>
    </>
  );
};

export default SavedTemplatesScreen;
