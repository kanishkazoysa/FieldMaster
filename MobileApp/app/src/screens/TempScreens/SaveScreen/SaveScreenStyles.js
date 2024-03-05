import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({

  top_Text_Styling: {
    color: 'white',
    fontSize: 16,
  },

  top_Bar_View: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 30,
    marginTop: 20,
  },

  top_Bar_Whole: {
    backgroundColor: '#007BFF',
    marginTop: 0,
    height: 80,
  },

  
  low_outer: {
    flex: 1,
    alignItems: 'center',

  },


   /*box1*/

   Box1: {
    width: "87%",
    height: 101,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
    marginTop: 30,
    borderRadius: 11,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 4,
    padding: 0,
  },

  titleText: {
    fontSize: 14,
    fontWeight: "bold",
    marginLeft: 16,
  },

  propertyBox: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    height: 50,
    width: "100%",
    backgroundColor: "white",
    marginTop: 7,
  },

  property: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "left",
    backgroundColor: "white",
    width: "46%",
    height: 50,
  },

  propertyDetails: {
    flexDirection: "column",
    marginLeft: 5,
    width: "50%",
    height: 40,
    backgroundColor: "white",
  },

  propertyLabel: {
    fontSize: 14,
  },

  propertyValue: {
    fontSize: 16,
    fontWeight: "bold",
  },

  input_view: {
    width: '95%',	
    height: 50,  
    backgroundColor: 'white',
    alignItems: "center",
    flexDirection: 'row',
    marginTop: 20,
    borderRadius: 11,
    paddingVertical: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 4,
    
  },

  bold_text: {
    fontSize: 15,
    fontWeight: 'bold',
    marginLeft: 20,
  },

  bold_text1: {
    fontSize: 15,
    fontWeight: 'bold',
    
  },

  input_text: {
    height: 20,
    width: 150,
    backgroundColor: 'white',
    marginLeft: 5,
    fontSize: 14,
    
  },
  inner_view_03: {
    width: '87%',
    marginHorizontal: 20,
    marginTop: 25,
   
  },
  description_input: {
    marginVertical: 10,
    borderRadius: 11,
    borderTopLeftRadius: 11,
    borderTopRightRadius: 11,
    backgroundColor: 'white',
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 4,
  },

 


});
