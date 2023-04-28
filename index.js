import { Mma } from "./src/mma";
var input, output, decoded;

window.addEventListener("load", function() {
    input = document.getElementById("input");
    output = document.getElementById("output");

    input.addEventListener("input", function() {
        decoded = Mma.DecompressDecode(input.value);
        console.log(Mma.toArray(decoded.parts[0]));
        output.textContent = PrettyPrint(decoded.parts[0]);
    })
});

// Convenient list of type names and content locations:
// Mma.IntegerMP   .n
// Mma.IntegerAP   .nstring
// Mma.RealMP      .n
// Mma.RealAP      .nstring
// Mma.Symbol      .name
// Mma.String      .str
// Mma.Expression  .head .parts

function PrettyPrint (obj, indent) {
    if (indent === undefined)
        indent = 0;
    
    var text = "";
    function print (str) {
        for (var i=0; i<indent; i++)
            text += " ";
        text += str;
        text += "\n";
    }

    if (obj instanceof Mma.IntegerMP || obj instanceof Mma.RealMP) {
        print(String(obj.n));
    } else if (obj instanceof Mma.IntegerAP || obj instanceof Mma.RealAP) {
        print(obj.nstring);
    } else if (obj instanceof Mma.Symbol) {
        print(obj.name);
    } else if (obj instanceof Mma.String) {
        print('"' + obj.str + '"');
    } else if (obj instanceof Mma.Expression) {
        print(obj.head.name + " [");
        for (var i=0; i < obj.parts.length; i++) {
            text += PrettyPrint(obj.parts[i], indent + 3);
        }
        print("]")
    } else {
        print("<???>");
    }
    return text;
}

