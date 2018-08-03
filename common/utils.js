// Add zero in front of numbers < 10
export function zeroPad(i) {
  if (i < 10) {
    i = "0" + i;
  }
  return i;
}

// Convert decimal colors to HEX
export function convertColor(color) {
  // Ensures the sent color is an integer
  let intColor = color - 0;
  
  // All colors need to follow this pattern
  let colorStr = "#000000";
  
  // Get the red, green, and blue values of the color
  let red      = (intColor&0x0000ff) << 16;
  let green    = intColor&0x00ff00;
  let blue     = (intColor&0xff0000) >>> 16;
  
  // Combine the separated colors in the proper order
  intColor     = red|green|blue;
  
  // Create the hex color with # by using the colorStr as a template
  let hexColor = intColor.toString(16);
  
  // Colors are in reverse order, substr them to place them in the proper order
  hexColor     = colorStr.substring(0,7 - hexColor.length) + hexColor;
  let actualRed   = hexColor.substring(5,7);
  let actualGreen = hexColor.substring(3,5);
  let actualBlue  = hexColor.substring(1,3);
  
  return "#"+actualRed+actualGreen+actualBlue;
}

export function colorModifier(color, percent) {
  var R = parseInt(color.substring(1,3),16);
  var G = parseInt(color.substring(3,5),16);
  var B = parseInt(color.substring(5,7),16);

  R = parseInt(R * (100 + percent) / 100);
  G = parseInt(G * (100 + percent) / 100);
  B = parseInt(B * (100 + percent) / 100);

  R = (R<255)?R:255;  
  G = (G<255)?G:255;  
  B = (B<255)?B:255;  

  var RR = ((R.toString(16).length==1)?"0"+R.toString(16):R.toString(16));
  var GG = ((G.toString(16).length==1)?"0"+G.toString(16):G.toString(16));
  var BB = ((B.toString(16).length==1)?"0"+B.toString(16):B.toString(16));

  return "#"+RR+GG+BB;
}