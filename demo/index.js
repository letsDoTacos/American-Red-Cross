// alert("Peanut Butter Jelly Time");

const myDiagram = new go.Diagram("myDiagramDiv",
  {
    "undoManager.isEnabled": true,
    layout: new go.TreeLayout({ angle: 0, layerSpacing: 35 })
  });

myDiagram.nodeTemplate =
  new go.Node("Horizontal",
    { background: "#56A0D3"  })
    // turn on photos here
    // .add(new go.Picture(
    //     { margin: 10, width: 50, height: 50, background: "grey" })
    //     .bind("source"))
    .add(new go.TextBlock("Default Text high",
        { margin: 12, stroke: "white", font: "bold 16px sans-serif", editable: true })
        .bind("text", "name" ),
        ),
  new go.Node("Horizontal",
  { background: "#56A0D3"  })
  .add(new go.TextBlock("Default Text low",
      { margin: 12, stroke: "white", font: "bold 16px sans-serif", editable: true })
      .bind("text", "title" ),
      );


// define a Link template that routes orthogonally, with no arrowhead
myDiagram.linkTemplate =
  new go.Link(
    // default routing is go.Link.Normal
    // default corner is 0
    { routing: go.Link.Orthogonal, corner: 5 })
    // the link path, a Shape
    .add(new go.Shape({ strokeWidth: 3, stroke: "#555" }))
    // if we wanted an arrowhead we would also add another Shape with toArrow defined:
    //.add(new go.Shape({  toArrow: "Standard", stroke: null  }))


// it's best to declare all templates before assigning the model
myDiagram.model = new go.TreeModel(
  [
    { key: "0", name: "RCCO, Charles Blake", title: "RCCO Director" },
    { key: "1", name: "DRO Director, Dave Gutierrez", title: "DRO Director" },
    { key: "2", parent:"1", name: "Chief of Staff, Kay Murphy", title: "Chief of Staff" },
    { key: "3", parent:"2", name: "Deputy Director, Emily Camp", title: "Deputy Director" },
    { key: "9", parent: "3", name: "AD Operations, Kevin White", title: "AD Operations" },
    { key: "8", parent: "3", name: "AD Planning, Peter Grey", title: "AD Planning" },
    { key: "4", parent: "3", name: "AD Logistics, Barbara Riester", title: "AD Logistics" },
    { key: "5", parent: "3", name: "AD Finance, Judy Blair", title: "AD Finance" },
    { key: "6", parent: "3", name: "AD Workforce, Sandi Wraith", title: "AD Workforce" },
    { key: "7", parent: "3", name: "AD External, William Slotter", title: "AD External" }

  ]);

  // center and search features 
       // Setup zoom to fit button
       document.getElementById('zoomToFit').addEventListener('click', () => myDiagram.commandHandler.zoomToFit());

       document.getElementById('centerRoot').addEventListener('click', () => {
         myDiagram.scale = 1;
         myDiagram.commandHandler.scrollToPart(myDiagram.findNodeForKey(1));
       });

           // the Search functionality highlights all of the nodes that have at least one data property match a RegExp
    function searchDiagram() {  // called by button
      var input = document.getElementById("mySearch");
      if (!input) return;
      myDiagram.focus();

      myDiagram.startTransaction("highlight search");

      if (input.value) {
        // search four different data properties for the string, any of which may match for success
        // create a case insensitive RegExp from what the user typed
        var safe = input.value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        var regex = new RegExp(safe, "i");
        var results = myDiagram.findNodesByExample({ name: regex },
          // { nation: regex },
          { title: regex },
          { headOf: regex });
        myDiagram.highlightCollection(results);
        // try to center the diagram at the first node that was found
        if (results.count > 0) myDiagram.centerRect(results.first().actualBounds);
      } else {  // empty string only clears highlighteds collection
        myDiagram.clearHighlighteds();
      }

      myDiagram.commitTransaction("highlight search");
    }