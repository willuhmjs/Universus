let input = document.getElementById("link_input");
let choice = ['https://www.youtube.com/watch?v=dQw4w9WgXcQ', 'https://www.instagram.com/p/BsOGulcndj-/?utm_medium=copy_link', 'https://twitter.com/elonmusk/status/1399985389725753346/photo/1', 'https://open.spotify.com/track/2GhVG8MEumQLI7ko9elqpr'][Math.floor(Math.random() * 4)];
input.placeholder = choice;