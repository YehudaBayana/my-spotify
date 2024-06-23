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