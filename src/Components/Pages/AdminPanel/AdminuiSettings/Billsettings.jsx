import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

// The dimensions of A4 paper in pixels (approx.)
const A4_WIDTH = 842;
const A4_HEIGHT = 1191;

const AdminBillSettings = () => {
    const [fields] = useState([
        { id: 'billNumber', label: 'Bill Number', type: 'text', required: true },
        { id: 'date', label: 'Date', type: 'date', required: true },
        { id: 'customerName', label: 'Customer Name', type: 'text', required: true },
        { id: 'itemDescription', label: 'Item Description', type: 'text', required: true },
        { id: 'quantity', label: 'Quantity', type: 'number', required: true },
        { id: 'unitPrice', label: 'Unit Price', type: 'number', required: true },
        { id: 'subtotal', label: 'Subtotal', type: 'number', required: true, computed: true },
        { id: 'taxRate', label: 'Tax Rate (%)', type: 'number', required: false },
        { id: 'totalDue', label: 'Total Due', type: 'number', required: true, computed: true },
        { id: 'paymentInstructions', label: 'Payment Instructions', type: 'textarea', required: false },
    ]);

    const [template, setTemplate] = useState([]); // Store final template configuration

    const onDragEnd = (result) => {
        // If dropped outside the canvas, do nothing
        if (!result.destination) return;

        // Get the destination droppableId to determine the drop target
        const destinationId = result.destination.droppableId;

        // Check if the drop is on the canvas
        if (destinationId === 'canvas') {
            const newTemplate = [...template];
            const field = fields.find((field) => field.id === result.draggableId);
            const position = {
                x: result.destination.x, // Use x from the drop result
                y: result.destination.y, // Use y from the drop result
            };
            // Ensure unique ID for the field in the template
            newTemplate.push({ ...field, position, uniqueId: `${field.id}-${newTemplate.length}` });
            setTemplate(newTemplate);
        }
    };

    const saveTemplate = () => {
        // Send the template configuration to the backend
        console.log('Template saved:', template);
        // Implement API call here to save the template
    };

    return (
        <div>
            <h1>Admin Bill Settings</h1>
            <DragDropContext onDragEnd={onDragEnd}>
                <div style={{ display: 'flex' }}>
                    <Droppable droppableId="fields">
                        {(provided) => (
                            <div
                                ref={provided.innerRef}
                                {...provided.droppableProps}
                                style={{ width: '200px', border: '1px solid #ccc', padding: '10px' }}
                            >
                                <h2>Available Fields</h2>
                                {fields.map((field, index) => (
                                    <Draggable key={field.id} draggableId={field.id} index={index}>
                                        {(provided) => (
                                            <div
                                                ref={provided.innerRef}
                                                {...provided.draggableProps}
                                                {...provided.dragHandleProps}
                                                style={{
                                                    padding: '5px',
                                                    border: '1px dashed #000',
                                                    marginBottom: '5px',
                                                    backgroundColor: '#fff',
                                                    ...provided.draggableProps.style,
                                                }}
                                            >
                                                {field.label}
                                            </div>
                                        )}
                                    </Draggable>
                                ))}
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>

                    <Droppable droppableId="canvas">
                        {(provided) => (
                            <div
                                ref={provided.innerRef}
                                {...provided.droppableProps}
                                style={{
                                    width: `${A4_WIDTH}px`,
                                    height: `${A4_HEIGHT}px`,
                                    border: '2px solid #000',
                                    position: 'relative',
                                    marginLeft: '20px',
                                }}
                                onDrop={(event) => {
                                    // Get the mouse coordinates relative to the canvas
                                    const canvasRect = provided.innerRef.current.getBoundingClientRect();
                                    const x = event.clientX - canvasRect.left;
                                    const y = event.clientY - canvasRect.top;

                                    // Trigger the drop action with coordinates
                                    onDragEnd({
                                        destination: { droppableId: 'canvas', x, y },
                                        draggableId: event.dataTransfer.getData('text/plain'), // Get the field id
                                    });
                                }}
                            >
                                <h2>A4 Canvas</h2>
                                {template.map((field) => (
                                    <div key={field.uniqueId} style={{
                                        position: 'absolute',
                                        left: `${field.position.x}px`,
                                        top: `${field.position.y}px`,
                                        border: '1px solid #888',
                                        padding: '5px',
                                        backgroundColor: '#f0f0f0',
                                    }}>
                                        {field.label}
                                    </div>
                                ))}
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>
                </div>
            </DragDropContext>
            <button onClick={saveTemplate}>Save Template</button>
        </div>
    );
};

export default AdminBillSettings;
