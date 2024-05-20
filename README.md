# Flow Builder

Welcome to the Flow Builder! This tool is designed to help you create and manage message flows with ease. Currently, the Flow Builder supports Text Nodes, but it is built to be extensible for future enhancements. This Readme provides a detailed overview of the features and functionality of the Flow Builder.

## Demo

Check out the live demo of the Flow Builder [here](https://react-message-flow.vercel.app/).

## Features

### 1. Text Node
- **Single Message Type**: Our flow builder currently supports only one type of message, which is the Text Message.
- **Multiple Instances**: There can be multiple Text Nodes in a single flow.
- **Drag and Drop**: Nodes are added to the flow by dragging and dropping from the Nodes Panel.

### 2. Nodes Panel
- **Node Housing**: This panel houses all kinds of Nodes that our Flow Builder supports.
- **Extensibility**: Currently, only the Message Node is available, but this section is designed to be extensible for future node types.

### 3. Edge
- **Node Connections**: Edges connect two Nodes together.

### 4. Source Handle
- **Edge Origin**: Source of a connecting edge.
- **Single Edge**: Can only have one edge originating from a source handle.

### 5. Target Handle
- **Edge Target**: Target of a connecting edge.
- **Multiple Edges**: Can have more than one edge connecting to a target handle.

### 6. Settings Panel
- **Node Configuration**: Settings Panel will replace the Nodes Panel when a Node is selected.
- **Text Editing**: It has a text field to edit the text of the selected Text Node.

### 7. Save Button
- **Save Functionality**: Button to save the flow.
- **Validation**: Save button press will show an error if there are more than one Nodes and more than one Node has empty target handles.

## How to Use

1. **Add Nodes**: Drag and drop Text Nodes from the Nodes Panel to the flow area.
2. **Connect Nodes**: Create connections between nodes by dragging from the source handle to the target handle.
3. **Edit Node Text**: Select a node to open the Settings Panel and edit the text of the node.
4. **Save Flow**: Click the Save Button to save your flow. Ensure all nodes (except the last node) have at least one connection originating from them to avoid errors.

## Future Enhancements

- Additional types of nodes (e.g., Image Nodes, Decision Nodes).
- More advanced validation and error handling.
- Improved user interface and experience.

## Getting Started

To get started with the Flow Builder, follow these steps:

1. Clone the repository: `[git clone https://github.com/your-repo/flow-builder.git](https://github.com/NiranjanPatil07/react-flow)`
2. Install dependencies: `npm install`
3. Start the development server: `npm run dev`

## Contributing

We welcome contributions to the Flow Builder. Please fork the repository and submit pull requests for any enhancements or bug fixes.

## License

This project is licensed under the MIT License. See the LICENSE file for more details.


