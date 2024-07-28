// const StyledList = styled(List)(({ theme }) => ({
//     backgroundColor: theme.palette.background.paper,
//     borderRadius: theme.shape.borderRadius,
//     boxShadow: theme.shadows[3],
//     marginTop: theme.spacing(2),
//     overflow: 'hidden',
//   }));
  
//   const StyledListItem = styled(ListItem)(({ theme }) => ({
//     backgroundColor: theme.palette.background.default,
//     margin: theme.spacing(1, 0),
//     padding: theme.spacing(1.5, 2),
//     borderRadius: theme.shape.borderRadius,
//     // boxShadow: theme.shadows[1],
//     // '&:hover': {
//     //   backgroundColor: theme.palette.action.hover,
//     // },
//     display: 'flex',
//     alignItems: 'center',
//   }));
  
//   const StyledListItemNew = styled(ListItem)(({ theme }) => ({
//     // flex: '1',
//     whiteSpace: 'nowrap',
//     overflow: 'hidden',
//     textOverflow: 'ellipsis',
//     // border: '1px solid #ccc',
//     padding: '10px',
//   }));
  
//   const StyledListItemIconThree = styled(ListItemIcon)(({ theme }) => ({
//     cursor: 'grab',
//     marginRight: theme.spacing(2),
//   }));
  
//   const ReorderListAlbum = ({ state }) => {
//     const location = useLocation();
//     const [type, playlistId] = location.pathname.split('/').filter((item) => item);
  
//     const [draggingIndex, setDraggingIndex] = useState(null);
//     const [album, setAlbum] = useState();
//     const [items, setItems] = useState([]);
//     useEffect(() => {
//       async function execute() {
//         const albumRes = await fetchPlayableItems(state.accessToken || localStorage.getItem('access_token'), playlistId, type);
//         console.log('trackRes ', albumRes);
//         setAlbum(albumRes);
//         if (albumRes?.tracks.items?.length > 0) {
//           setItems(albumRes?.tracks.items);
//         }
//       }
//       execute();
//     }, [playlistId, type]);
  
//     const onDragStart = (e, index) => {
//       setDraggingIndex(index);
//     };
  
//     const onDragOver = (e, index) => {
//       e.preventDefault();
//       const draggedOverItem = items[draggingIndex];
  
//       if (draggingIndex === index) {
//         return;
//       }
  
//       const itemsCopy = [...items];
//       itemsCopy.splice(draggingIndex, 1);
//       itemsCopy.splice(index, 0, draggedOverItem);
  
//       setDraggingIndex(index);
//       setItems(itemsCopy);
//     };
  
//     const onDragEnd = (e) => {
//       setDraggingIndex(null);
//     };
//     // console.log("draggingIndex === index ",draggingIndex === index)
//     return (
//       <Box p={2}>
//         <StyledList component={Paper}>
//           {items?.map((track, index) => {
//             console.log('draggingIndex === index ', draggingIndex === index);
//             return (
//               <StyledListItem
//                 className={draggingIndex === index ? 'dragging' : ''}
//                 key={track.id}
//                 draggable
//                 onDragStart={(e) => onDragStart(e, index)}
//                 onDragOver={(e) => onDragOver(e, index)}
//                 onDragEnd={onDragEnd}>
//                 <StyledListItemIconThree>
//                   <IconButton>
//                     <Reorder />
//                   </IconButton>
//                 </StyledListItemIconThree>
//                 <ImageListItem>
//                   <Avatar src={`${album?.images[0]?.url}`} />
//                 </ImageListItem>
//                 <ListItemText primary={track.name} sx={{ marginLeft: 2 }} />
//               </StyledListItem>
//             );
//           })}
//         </StyledList>
//       </Box>
//     );
//   };

// [
//     {
//       "booking": {
//         "bookedEntity": {
//           "schedule": {
//             "location": {
//               "name": "Location 1",
//               "locationType": "OWNER_BUSINESS",
//             },
//             "timezone": "Europe/Dublin",
//             "firstSessionStart": "2024-07-22T17:30:00.000+01:00",
//             "lastSessionEnd": "2024-09-26T19:00:00.000+01:00"
//           },
//           "title": "G1",
//           "tags": [
//             "COURSE"
//           ]
//         },
//         "contactDetails": {
//           "firstName": "yuda",
//           "lastName": "test",
//           "email": "test@gamil.com",
//           "phone": "1234123412"
//         },
//         "additionalFields": [],
//         "numberOfParticipants": 1,
//         "status": "CONFIRMED",
//         "selectedPaymentOption": "OFFLINE",
//         "bookingSource": {
//           "platform": "WEB",
//           "actor": "BUSINESS",
//           "appName": "Wix Bookings"
//         },
//         "participantNotification": {
//           "notifyParticipants": false
//         },
//         "revision": "4",
//         "createdBy": {
//         },
//         "startDate": "2024-07-22T16:30:00.000Z",
//         "endDate": "2024-09-26T18:00:00.000Z",
//         "flowControlSettings": {
//           "ignoreBookingWindow": true,
//           "skipBusinessConfirmation": true,
//           "withRefund": false
//         },
//         "totalParticipants": 1,
//         "v2Availability": false,
//         "_createdDate": "2024-07-24T11:11:36.924Z",
//         "_updatedDate": "2024-07-24T11:11:43.629Z"
//       },
//       "attendance": {
//         "status": "NOT_SET",
//         "numberOfAttendees": 0
//       }
//     }]
//     {
//       "booking": {
//         "bookedEntity": {
//           "schedule": {
//             "location": {
//               "formattedAddress": "Zoom",
//               "locationType": "OWNER_CUSTOM"
//             },
//             "timezone": "Europe/Dublin",
//             "firstSessionStart": "2024-07-22T17:30:00.000+01:00",
//             "lastSessionEnd": "2024-09-26T19:00:00.000+01:00"
//           },
//           "title": "G2 Online",
//           "tags": [
//             "COURSE"
//           ]
//         },
//         "contactDetails": {
//           "firstName": "yuda",
//           "lastName": "test",
//           "email": "test@gamil.com",
//           "phone": "1234123412"
//         },
//         "additionalFields": [],
//         "numberOfParticipants": 1,
//         "status": "CONFIRMED",
//         "selectedPaymentOption": "OFFLINE",
//         "bookingSource": {
//           "platform": "WEB",
//           "actor": "BUSINESS",
//           "appName": "Wix Bookings"
//         },
//         "participantNotification": {
//           "notifyParticipants": false
//         },
//         "revision": "4",
//         "createdBy": {
//         },
//         "startDate": "2024-07-22T16:30:00.000Z",
//         "endDate": "2024-09-26T18:00:00.000Z",
//         "flowControlSettings": {
//           "ignoreBookingWindow": true,
//           "skipBusinessConfirmation": true,
//           "withRefund": false
//         },
//         "totalParticipants": 1,
//         "v2Availability": false,
//         "_createdDate": "2024-07-24T11:14:45.586Z",
//         "_updatedDate": "2024-07-24T11:14:50.348Z"
//       },
//       "attendance": {
//         "status": "NOT_SET",
//         "numberOfAttendees": 0
//       }
//     },
//     {
//       "booking": {
//         "bookedEntity": {
//           "schedule": {
//             "location": {
//               "name": "Location 1",
//               "locationType": "OWNER_BUSINESS",
//             },
//             "timezone": "Europe/Dublin",
//             "firstSessionStart": "2024-07-22T17:30:00.000+01:00",
//             "lastSessionEnd": "2024-09-26T19:00:00.000+01:00"
//           },
//           "title": "G1",
//           "tags": [
//             "COURSE"
//           ]
//         },
//         "contactDetails": {
//           "firstName": "Yehuda Bayana",
//           "lastName": "",
//           "email": "yehudaba@wix.com",
//           "phone": " "
//         },
//         "additionalFields": [],
//         "numberOfParticipants": 1,
//         "status": "CONFIRMED",
//         "selectedPaymentOption": "OFFLINE",
//         "bookingSource": {
//           "platform": "WEB",
//           "actor": "BUSINESS",
//           "appName": "Wix Bookings"
//         },
//         "participantNotification": {
//           "notifyParticipants": false
//         },
//         "revision": "4",
//         "createdBy": {
//         },
//         "startDate": "2024-07-22T16:30:00.000Z",
//         "endDate": "2024-09-26T18:00:00.000Z",
//         "flowControlSettings": {
//           "ignoreBookingWindow": true,
//           "skipBusinessConfirmation": true,
//           "withRefund": false
//         },
//         "totalParticipants": 1,
//         "v2Availability": false,
//         "_createdDate": "2024-07-24T11:13:24.507Z",
//         "_updatedDate": "2024-07-24T11:13:30.538Z"
//       },
//       "attendance": {
//         "status": "NOT_SET",
//         "numberOfAttendees": 0
//       }
//     },
//     {
//       "booking": {
//         "bookedEntity": {
//           "schedule": {
//             "location": {
//               "formattedAddress": "Zoom",
//               "locationType": "OWNER_CUSTOM"
//             },
//             "timezone": "Europe/Dublin",
//             "firstSessionStart": "2024-07-22T17:30:00.000+01:00",
//             "lastSessionEnd": "2024-09-26T19:00:00.000+01:00"
//           },
//           "title": "G2 Online",
//           "tags": [
//             "COURSE"
//           ]
//         },
//         "contactDetails": {
//           "firstName": "Yehuda Bayana",
//           "lastName": "",
//           "email": "yehudaba@wix.com",
//           "phone": " "
//         },
//         "additionalFields": [],
//         "numberOfParticipants": 1,
//         "status": "CONFIRMED",
//         "selectedPaymentOption": "OFFLINE",
//         "bookingSource": {
//           "platform": "WEB",
//           "actor": "BUSINESS",
//           "appName": "Wix Bookings"
//         },
//         "participantNotification": {
//           "notifyParticipants": false
//         },
//         "revision": "4",
//         "createdBy": {
//         },
//         "startDate": "2024-07-22T16:30:00.000Z",
//         "endDate": "2024-09-26T18:00:00.000Z",
//         "flowControlSettings": {
//           "ignoreBookingWindow": true,
//           "skipBusinessConfirmation": true,
//           "withRefund": false
//         },
//         "totalParticipants": 1,
//         "v2Availability": false,
//         "_createdDate": "2024-07-24T11:11:25.342Z",
//         "_updatedDate": "2024-07-24T11:11:30.136Z"
//       },
//       "attendance": {
//         "status": "NOT_SET",
//         "numberOfAttendees": 0
//       }
//     },
//     {
//       "booking": {
//         "bookedEntity": {
//           "schedule": {
//             "location": {
//               "name": "Location 1",
//               "locationType": "OWNER_BUSINESS",
//             },
//             "timezone": "Europe/Dublin",
//             "firstSessionStart": "2024-07-21T17:30:00.000+01:00",
//             "lastSessionEnd": "2024-09-25T19:00:00.000+01:00"
//           },
//           "title": "D1",
//           "tags": [
//             "COURSE"
//           ]
//         },
//         "contactDetails": {
//           "firstName": "Yehuda Bayana",
//           "lastName": "",
//           "email": "yehudaba@wix.com",
//           "phone": " "
//         },
//         "additionalFields": [],
//         "numberOfParticipants": 1,
//         "status": "CONFIRMED",
//         "selectedPaymentOption": "OFFLINE",
//         "bookingSource": {
//           "platform": "WEB",
//           "actor": "BUSINESS",
//           "appName": "Wix Bookings"
//         },
//         "participantNotification": {
//           "notifyParticipants": false
//         },
//         "revision": "4",
//         "createdBy": {
//         },
//         "startDate": "2024-07-21T16:30:00.000Z",
//         "endDate": "2024-09-25T18:00:00.000Z",
//         "flowControlSettings": {
//           "ignoreBookingWindow": true,
//           "skipBusinessConfirmation": true,
//           "withRefund": false
//         },
//         "totalParticipants": 1,
//         "v2Availability": false,
//         "_createdDate": "2024-07-24T11:11:09.253Z",
//         "_updatedDate": "2024-07-24T11:11:15.342Z"
//       },
//       "attendance": {
//         "status": "NOT_SET",
//         "numberOfAttendees": 0
//       }
//     },
//     {
//       "booking": {
//         "bookedEntity": {
//           "schedule": {
//             "location": {
//               "name": "Location 1",
//               "locationType": "OWNER_BUSINESS",
//             },
//             "timezone": "Europe/Dublin",
//             "firstSessionStart": "2024-07-21T17:30:00.000+01:00",
//             "lastSessionEnd": "2024-09-25T19:00:00.000+01:00"
//           },
//           "title": "D1",
//           "tags": [
//             "COURSE"
//           ]
//         },
//         "contactDetails": {
//           "firstName": "yuda",
//           "lastName": "test",
//           "email": "test@gamil.com",
//           "phone": "1234123412"
//         },
//         "additionalFields": [],
//         "numberOfParticipants": 1,
//         "status": "CONFIRMED",
//         "selectedPaymentOption": "OFFLINE",
//         "bookingSource": {
//           "platform": "WEB",
//           "actor": "BUSINESS",
//           "appName": "Wix Bookings"
//         },
//         "participantNotification": {
//           "notifyParticipants": false
//         },
//         "revision": "4",
//         "createdBy": {
//         },
//         "startDate": "2024-07-21T16:30:00.000Z",
//         "endDate": "2024-09-25T18:00:00.000Z",
//         "flowControlSettings": {
//           "ignoreBookingWindow": true,
//           "skipAvailabilityValidation": true,
//           "skipBusinessConfirmation": true,
//           "skipSelectedPaymentOptionValidation": true,
//           "withRefund": false
//         },
//         "totalParticipants": 1,
//         "v2Availability": false,
//         "_id": "9a4b0502-41ff-4e3c-9137-9e6684e60baf",
//         "_createdDate": "2024-07-24T11:13:43.469Z",
//         "_updatedDate": "2024-07-24T11:13:51.780Z"
//       },
//       "attendance": {
//         "status": "NOT_SET",
//         "numberOfAttendees": 0
//       }
//     }
//   ]