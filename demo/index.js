// alert("Peanut Butter Jelly Time");


const $ = go.GraphObject.make;  // for conciseness in defining templates

// some constants that will be reused within templates
var mt8 = new go.Margin(15, 0, 0, 0);
var mr8 = new go.Margin(0, 15, 0, 0);
var ml8 = new go.Margin(0, 0, 0, 15);
var roundedRectangleParams = {
  parameter1: 2,  // set the rounded corner
  spot1: go.Spot.TopLeft, spot2: go.Spot.BottomRight  // make content go all the way to inside edges of rounded corners
};


myDiagram =
    $(go.Diagram, "myDiagramDiv", // must be the ID or reference to div
      {
        initialAutoScale: go.Diagram.Uniform,
        maxSelectionCount: 1, // users can select only one part at a time
        validCycle: go.Diagram.CycleDestinationTree, // make sure users can only create trees
        "clickCreatingTool.archetypeNodeData": { // allow double-click in background to create a new node
          name: "(new person)",
          title: "",
          comments: "",
        },
        "clickCreatingTool.insertPart": function(loc) {  // override to scroll to the new node
          const node = go.ClickCreatingTool.prototype.insertPart.call(this, loc);
          if (node !== null) {
            this.diagram.select(node);
            this.diagram.commandHandler.scrollToPart(node);
            this.diagram.commandHandler.editTextBlock(node.findObject("NAMETB"));
          }
          return node;
        },
        layout:
          $(SideTreeLayout,
            {
              treeStyle: go.TreeLayout.StyleLastParents,
              arrangement: go.TreeLayout.ArrangementHorizontal,
              // properties for most of the tree:
              angle: 90,
              layerSpacing: 35,
              // properties for the "last parents":
              alternateAngle: 90,
              alternateLayerSpacing: 35,
              alternateAlignment: go.TreeLayout.AlignmentBus,
              alternateNodeSpacing: 20,
            }),
        // "undoManager.isEnabled": true, // enable undo & redo
        "draggingTool.isEnabled": false
      });
    
  // This function provides a common style for most of the TextBlocks.
  // Some of these values may be overridden in a particular TextBlock.
  function textStyle(field) {
    return [
      {
        font: "16pt sans-serif", stroke: "black",  
        visible: false  // only show textblocks when there is corresponding data for them
      },
      new go.Binding("visible", field, val => val !== undefined),
    ];
  }

  // define the Node template
  myDiagram.nodeTemplate =
    $(go.Node, "Auto",
    
      {
        locationSpot: go.Spot.Top,
        isShadowed: true, shadowBlur: 2,
        shadowOffset: new go.Point(0, 2),
        shadowColor: "rgba(0, 0, 0, .25)",
        selectionAdornmentTemplate:  // selection adornment to match shape of nodes
          $(go.Adornment, "Auto",
            $(go.Shape, "RoundedRectangle", roundedRectangleParams,
              { fill: null, stroke: "#7986cb", strokeWidth: 3 },
            ),
            $(go.Placeholder)
          )  // end Adornment
          
      },
      $(go.Shape, "RoundedRectangle", roundedRectangleParams,
        { margin: 8, name: "SHAPE", fill: "#ffffff", strokeWidth: 0 },
        // gold if highlighted, white otherwise
        new go.Binding("fill", "isHighlighted", h => h ? "gold" : "#ffffff").ofObject()
      ),
      // Hyperlink text 
      // ===================
    //   $("HyperlinkText",
    //   function(node) { return "https://www.linkedin.com/" + node.data.version; },
    //   function(node) { return "Visit GoJS " + node.data.version; },
    //   { margin: 40, font: "16pt sans-serif", stroke: "red", }
    // ),
    // $("HyperlinkText",
    // node => "https://www.linkedin.com/search/results/all/?keywords=" + encodeURIComponent(node.data.name),
    // node => node.data.name,
    // { textAlign: "bottom", stroke: "green", font: "16pt sans-serif", }
    //   ),

      $(go.Panel, "Vertical",
        $(go.Panel, "Vertical",
          { margin: 40 },
          $(go.Panel, "Table",
            $(go.TextBlock,
              {
                row: 0, alignment: go.Spot.Center,
                font: "16pt sans-serif",
                stroke: "red",
                maxSize: new go.Size(160, NaN)
              },
              new go.Binding("text", "title")
            ),
              $(go.TextBlock, textStyle("Needed"),
            {
              row: 1, alignment: go.Spot.Center,
              maxSize: new go.Size(160, NaN)
            },
              // new go.Binding("text", "Needed", head => "Needed: " + head)

          ),  
      // Button 1
    // ================================> 
      $("Button",
      {
        margin: 2, row: 2,
        // set properties on the border Shape of the "Button"
        "ButtonBorder.figure": "RoundedRectangle",
        "ButtonBorder.fill": "red",
        "ButtonBorder.stroke": "black",
        "ButtonBorder.strokeWidth": 3,
        // set properties on the "Button" itself used by its event handlers
        "_buttonFillOver": "Green",
        "_buttonStrokeOver": "black",
        "_buttonFillPressed": "lightgray",
        // link
        // ================================> 
        click: function(e, button) { window.open("https://arcstage.tcheetah.com/?nd=m_home") }
        },
      $(go.TextBlock, "Disable / Enable Assignment", { margin: 2, stroke: "White", font:  "16pt sans-serif" })
      ),
      $("PanelExpanderButton", "INFO",
        { row: 0, column: 1, rowSpan: 2, margin: ml8 }
        )
        )
        ),
        $(go.Shape, "LineH",
          {
            stroke: "rgba(0, 0, 0, .60)", strokeWidth: 1,
            height: 1, stretch: go.GraphObject.Horizontal
          },

          new go.Binding("visible").ofObject("INFO")  // only visible when info is expanded
        ),
        // Dynamic links
        // ==================
        $("HyperlinkText", // To make the link Dynamic + encodeURIComponent(node.data.name)
        node => "https://arcssotest33.tcheetah09.com/?nd=vms_profile&return_jid=3&account_id=1633793",
        node => node.data.name + " C:5/1 E:6/1",
        { textAlign: "center", stroke: "green", font: "24pt sans-serif", margin: 20 }
          ),
        $(go.Panel, "Vertical",
          {
            name: "INFO",  // identify to the PanelExpanderButton
            stretch: go.GraphObject.Horizontal,  // take up whole available width
            margin: 8,
            defaultAlignment: go.Spot.Center,  // thus no need to specify alignment on each element
          },

           // ================================>
          // Adding test text here
          $(go.TextBlock, textStyle("person2"), { 
            margin: 2, stroke: "purple", font:  "16pt sans-serif" 
          },
          new go.Binding("text", "person2", head => head + " C:6/1 E:7/1")
        ),
        $(go.TextBlock, textStyle("person3"), { 
          margin: 2, stroke: "blue", font:  "16pt sans-serif" 
        },
        new go.Binding("text", "person3", head => head + " C:7/1 E:8/1")
      ),
            // Button 2
    // ================================>
    $("Button",
    {
      margin: 2,
      // set properties on the border Shape of the "Button"
      "ButtonBorder.figure": "RoundedRectangle",
      "ButtonBorder.fill": "red",
      "ButtonBorder.stroke": "black",
      "ButtonBorder.strokeWidth": 3,
      // set properties on the "Button" itself used by its event handlers
      "_buttonFillOver": "Green",
      "_buttonStrokeOver": "black",
      "_buttonFillPressed": "lightgray",
    // link  
    // ================================>
      click: function(e, button) { window.open("https://www.digitalcheetah.com") }
    },
    $(go.TextBlock, "Open Staffing Request", { margin: 2, textAlign: "center", stroke: "White", font: "16pt sans-serif" })
    ),
      // Button 3
    // ================================>
    $("Button",
        {
          margin: 2,
          // set properties on the border Shape of the "Button"
          "ButtonBorder.figure": "RoundedRectangle",
          "ButtonBorder.fill": "red",
          "ButtonBorder.stroke": "black",
          "ButtonBorder.strokeWidth": 3,
          // set properties on the "Button" itself used by its event handlers
          "_buttonFillOver": "Green",
          "_buttonStrokeOver": "black",
          "_buttonFillPressed": "lightgray",
        // link  
        // ================================>
          click: function(e, button) { window.open("https://www.digitalcheetah.com") }
        },
        $(go.TextBlock, "Create Staffing Request", { margin: 2, textAlign: "center", stroke: "White", font: "16pt sans-serif" })
      ),
        )
      )
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
      // .add(new go.Shape({  toArrow: "Standard", stroke: null  }))

  // it's best to declare all templates before assigning the model
  myDiagram.model = new go.TreeModel(
    [
      { key: "0", parent:"", name: "Charles Blake", title: "RCCO Director", person1: "Dave Gutierrez", person2: "Kay Murphy" },
      { key: "1", parent:"1", empty: "", name: "Dave Gutierrez", title: "DRO Director"},
      { key: "2", parent:"1", name: "Kay Murphy", title: "Chief of Staff", Needed: "3 - 4", disEna: "",  person2: "person2" , person3: "person3"},
      { key: "3", parent:"1", name: "Emily Camp", title: "Deputy Director", person2: "person2" , person3: "person3" },
      { key: "4", parent:"3", name: "Kay Wilkins", title: "EOLN Lead", person2: "person2" , person3: "person3"},
      { key: "5", parent: "2", name: "Kevin White", title: "AD Operations", person2: "person2" , person3: "person3" },
      { key: "6", parent: "2", name: "Peter Grey", title: "AD Planning", person2: "person2" , person3: "person3" },
      { key: "7", parent: "2", name: "Barbara Riester", title: "AD Logistics",  person2: "person2" , person3: "person3" },
      { key: "8", parent: "2", name: "Judy Blair", title: "AD Finance", person2: "person2" , person3: "person3" },
      { key: "9", parent: "2", name: "Sandi Wraith", title: "AD Workforce", person2: "person2" , person3: "person3" },
      { key: "10", parent: "6", name: "Cortney Shatraw", title: "Disaster Assessment Manager", person2: "person2" , person3: "person3"}, 
      { key: "11", parent: "5", name: "-central", title: "Itinerating DAD Response", person2: "person2" , person3: "person3"},
      { key: "12", parent: "5", name: "-north", title: "Itinerating DAD Response", person2: "person2" , person3: "person3"},
      { key: "13", parent: "5", name: "-sw", title: "Itinerating DAD Response", person2: "person2" , person3: "person3"},
      { key: "14", parent: "5", name: "Gail Snieder", title: "Disability Integration Chief", person2: "person2" , person3: "person3"},
      { key: "15", parent: "7", name: "Robert English", title: "Warehousing Manager", person2: "person2" , person3: "person3"},
      { key: "16", parent: "6", name: "Rob Thomas", title: "Situation Unit Manager", person2: "person2" , person3: "person3"},
      { key: "17", parent: "6", name: "Alyson GOrdon", title: "Documentation Unit Manager",  person2: "person2" , person3: "person3"},
      { key: "18", parent: "6", name: "Louise Grantt", title: "FSI Manager", person2: "person2" , person3: "person3"},
      { key: "19", parent: "7", name: "Doug Brown", title: "Logistics Lead", person2: "person2" , person3: "person3"},
      { key: "20", parent: "7", name: "Tammy Easter", title: "Supply Manager", person2: "person2" , person3: "person3"},
      { key: "21", parent: "7", name: "Harry Feirman", title: "Transportation Manager", person2: "person2" , person3: "person3"},
      { key: "22", parent: "8", name: "Tera Bess", title: "LCV Manager",  person2: "person2" , person3: "person3"},
      { key: "23", parent: "8", name: "Brenda Hewlett", title: "Training Manager",  person2: "person2" , person3: "person3"},
      { key: "24", parent: "8", name: "Lou Kennedy", title: "Staff Relations", person2: "person2" , person3: "person3"},
      { key: "25", parent: "8", name: "Nicole Harris", title: "EBV Manager", person2: "person2" , person3: "person3"},
      { key: "26", parent: "8", name: "Jodi Tolliver", title: "SPS Manager", person2: "person2" , person3: "person3"},
      { key: "27", parent: "8", name: "Gwen Hillard", title: "Staff Lodging", person2: "person2" , person3: "person3"},
      { key: "28", parent: "9", name: "Jermaine Smith", title: "Fundraising Manager", person2: "person2" , person3: "person3"},
      { key: "29", parent: "9", name: "Jerry George", title: "Government Operations Manager",  person2: "person2" , person3: "person3" },
      { key: "30", parent: "9", name: "..", title: "Public Affairs Manager", person2: "person2" , person3: "person3"},
      { key: "31", parent: "9", name: "Kamalah Harris", title: "CEP Manager", person2: "person2" , person3: "person3"},
    ]
    );

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


};

    // PRINT FUNCTION ***Currently not*** working
    // ============================================>

 // if width or height are below 50, they are set to 50
// function generateImages(width, height) {
//   // sanitize input
//   width = parseInt(width);
//   height = parseInt(height);
//   if (isNaN(width)) width = 100;
//   if (isNaN(height)) height = 100;
//   // Give a minimum size of 50x50
//   width = Math.max(width, 50);
//   height = Math.max(height, 50);
// // update from getElementById
//   var imgDiv = document.querySelectorAll ('myImages'); 
//   imgDiv.innerHTML = ''; // clear out the old images, if any
//   var db = myDiagram.documentBounds;
//   var boundswidth = db.width;
//   var boundsheight = db.height;
//   var imgWidth = width;
//   var imgHeight = height;
//   var p = db.position;
//   for (var i = 0; i < boundsheight; i += imgHeight) {
//     for (var j = 0; j < boundswidth; j += imgWidth) {
//       var img = myDiagram.makeImage({
//         scale: 1,
//         position: new go.Point(p.x + j, p.y + i),
//         size: new go.Size(imgWidth, imgHeight)
//       });
//       // Append the new HTMLImageElement to the #myImages div
//       img.className = 'images';
//       imgDiv.appendChild(img);
//       imgDiv.appendChild(document.createElement('br'));
//     }
//   }
// }

// var button = document.getElementById('makeImages');
// button.addEventListener('click', function() {
//   var width = parseInt(document.getElementById('widthInput').value);
//   var height = parseInt(document.getElementById('heightInput').value);
//   generateImages(width, height);
// }, false);

// // Call it with some default values
// generateImages(700, 960);