// // if ('serviceWorker' in navigator) {
// //     window.addEventListener('load', () => {
// //         navigator.serviceWorker.register('sw.js').then(registration => {
// //             console.log('SW - Registered: ', registration);
// //         }).catch(registrationError => {
// //             console.log('SW - Registration failed: ', registrationError);
// //         });
// //     });
// // }
// import DB from "./library/database"

// DB.get("theme", "config").then(async theme => {
//     if ( !theme ) {
//         if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
//             await DB.put("dark", "theme", "config")
//             document.documentElement.setAttribute("data-theme", "dark")
//         } else {
//             await DB.put("light", "theme", "config")
//         }
//         await DB.put("Select a folder with fonts...", "dirname", "config")
//         await DB.put(25, "rows", "config")
//     } else {
//         document.documentElement.setAttribute("data-theme", theme)
//     }
// })
