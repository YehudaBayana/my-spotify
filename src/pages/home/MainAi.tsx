// // import React from "react";
// // import { Box, Typography, Grid, Card, CardMedia } from "@mui/material";
// // import SuggestedSongs from "../../components/suggestedSongs/SuggestedSongs";

// // const App: React.FC = () => {
// //   const songs = [
// //     {
// //       alt: "Song 1",
// //       src: "https://via.placeholder.com/150",
// //       title: "Song Title 1",
// //       artistName: "Artist 1",
// //     },
// //     {
// //       alt: "Song 2",
// //       src: "https://via.placeholder.com/150",
// //       title: "Song Title 2",
// //       artistName: "Artist 2",
// //     },
// //     {
// //       alt: "Song 3",
// //       src: "https://via.placeholder.com/150",
// //       title: "Song Title 3",
// //       artistName: "Artist 3",
// //     },
// //   ];

// //   return (
// //     <Box
// //       sx={{
// //         backgroundColor: "#666",
// //         color: "#fff",
// //         minHeight: "100vh",
// //         padding: "20px",
// //       }}
// //     >
// //       {/* Header */}
// //       <Box sx={{ borderBottom: "2px solid #888", paddingBottom: "10px" }}>
// //         <Typography variant="h5">Home</Typography>
// //       </Box>

// //       <Box sx={{ padding: "10px 0" }}>
// //         <Typography variant="subtitle1">The Best For You</Typography>
// //         <Typography variant="body2">sic-up Music</Typography>
// //       </Box>
// //       <Grid container spacing={2}>
// //         {/* Main Content */}
// //         <Grid item xs={12} md={8}>
// //           <Card sx={{ borderRadius: "8px", position: "relative" }}>
// //             <CardMedia
// //               component="img"
// //               height="400"
// //               image="https://via.placeholder.com/600x400"
// //               alt="Queen II Album Cover"
// //             />
// //           </Card>

// //           {/* Additional Images */}
// //           <Grid container spacing={2} sx={{ marginTop: "20px" }}>
// //             {[1, 1, 1].map(() => (
// //               <Grid item xs={4}>
// //                 <Card sx={{ borderRadius: "8px" }}>
// //                   <CardMedia
// //                     component="img"
// //                     height="120"
// //                     image="https://via.placeholder.com/150"
// //                     alt="Secondary Image 1"
// //                   />
// //                 </Card>
// //               </Grid>
// //             ))}
// //           </Grid>
// //         </Grid>

// //         <Grid item xs={12} md={4}>
// //           {/* Sidebar Content */}
// //           <SuggestedSongs title="The Most Played Songs" songs={songs} />
// //           <SuggestedSongs title="The Most Played Songs" songs={songs} />
// //           <SuggestedSongs title="The Most Played Songs" songs={songs} />
// //         </Grid>
// //       </Grid>
// //     </Box>
// //   );
// // };

// // export default App;

// import React from "react";
// import { Box, Typography, Grid, Card, CardMedia, Button, List, ListItem, ListItemText } from "@mui/material";

// const App: React.FC = () => {
//     return (
//         <Box sx={{ backgroundColor: "#666", color: "#fff", minHeight: "100vh", padding: "20px" }}>
//             {/* Header */}
//             <Box sx={{ borderBottom: "1px solid #888", paddingBottom: "10px", marginBottom: "20px" }}>
//                 <Typography variant="h5">Home</Typography>
//                 <Typography variant="subtitle1">The Best For You</Typography>
//                 <Typography variant="body2">sic-up Music</Typography>
//             </Box>

//             <Grid container spacing={2}>
//                 {/* Main Content */}
//                 <Grid item xs={12} md={8} container spacing={2}>
//                     <Grid item xs={8}>
//                         <Card sx={{ borderRadius: "8px", position: "relative" }}>
//                             <CardMedia
//                                 component="img"
//                                 height="400"
//                                 image="https://via.placeholder.com/600x400" // Replace with actual image URL
//                                 alt="Queen II Album Cover"
//                             />
//                         </Card>
//                     </Grid>

//                     <Grid item xs={4} container spacing={2}>
//                         <Grid item xs={12}>
//                             <Card sx={{ borderRadius: "8px", position: "relative" }}>
//                                 <CardMedia
//                                     component="img"
//                                     height="120"
//                                     image="https://via.placeholder.com/150" // Replace with actual image URL
//                                     alt="Secondary Image 1"
//                                 />

//                             </Card>
//                         </Grid>
//                         <Grid item xs={12}>
//                             <Card sx={{ borderRadius: "8px", position: "relative" }}>
//                                 <CardMedia
//                                     component="img"
//                                     height="120"
//                                     image="https://via.placeholder.com/150" // Replace with actual image URL
//                                     alt="Secondary Image 2"
//                                 />

//                             </Card>
//                         </Grid>
//                         <Grid item xs={12}>
//                             <Card sx={{ borderRadius: "8px", position: "relative" }}>
//                                 <CardMedia
//                                     component="img"
//                                     height="120"
//                                     image="https://via.placeholder.com/150" // Replace with actual image URL
//                                     alt="Secondary Image 3"
//                                 />

//                             </Card>
//                         </Grid>
//                     </Grid>
//                 </Grid>

//                 {/* Sidebar Content */}
//                 <Grid item xs={12} md={4}>
//                     {/* "The Most Played Songs" Section */}
//                     <Typography variant="h6" sx={{ marginBottom: "10px" }}>
//                         The Most Played Songs
//                     </Typography>
//                     <List sx={{ backgroundColor: "#555", borderRadius: "8px", padding: "10px" }}>
//                         <ListItem>
//                             <ListItemText primary="November Rain" secondary="Guns N' Roses" />
//                         </ListItem>
//                         <ListItem>
//                             <ListItemText primary="In Da Club" secondary="50 Cent" />
//                         </ListItem>
//                         <ListItem>
//                             <ListItemText primary="Stayin' Alive" secondary="Bee Gees" />
//                         </ListItem>
//                         <ListItem>
//                             <ListItemText primary="Toxic" secondary="Britney Spears" />
//                         </ListItem>
//                     </List>

//                     {/* "Recently Added" Section */}
//                     <Typography variant="h6" sx={{ margin: "20px 0 10px" }}>
//                         Recently Added
//                     </Typography>
//                     <List sx={{ backgroundColor: "#555", borderRadius: "8px", padding: "10px" }}>
//                         <ListItem>
//                             <ListItemText primary="Royalty" secondary="Chris Brown" />
//                         </ListItem>
//                         <ListItem>
//                             <ListItemText primary="Die For You" secondary="The Weeknd" />
//                         </ListItem>
//                         <ListItem>
//                             <ListItemText primary="Hebrew Song" secondary="Artist Name" />
//                         </ListItem>
//                         <ListItem>
//                             <ListItemText primary="Another Song" secondary="Artist Name" />
//                         </ListItem>
//                     </List>

//                     {/* "Sic-up Picked For You" Section */}
//                     <Typography variant="h6" sx={{ margin: "20px 0 10px" }}>
//                         Sic-up Picked For You
//                     </Typography>
//                     <List sx={{ backgroundColor: "#555", borderRadius: "8px", padding: "10px" }}>
//                         <ListItem>
//                             <ListItemText primary="Stand Up" secondary="Cynthia Erivo" />
//                         </ListItem>
//                         <ListItem>
//                             <ListItemText primary="Lone In The Dark" secondary="Artist Name" />
//                         </ListItem>
//                         <ListItem>
//                             <ListItemText primary="Nonstop" secondary="Drake" />
//                         </ListItem>
//                         <ListItem>
//                             <ListItemText primary="Another Song" secondary="Artist Name" />
//                         </ListItem>
//                     </List>
//                 </Grid>
//             </Grid>
//         </Box>
//     );
// };

// export default App;
