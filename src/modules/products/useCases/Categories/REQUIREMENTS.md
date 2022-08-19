# Applications Requirements - Categories Use Cases
Obs: the "user" term are used to represent both employee and customer.

--------------------------------------------------------------------------------

## Register category

### **FR** => Functional requirements
[] - Should be able to create a new category.

### **BR** => Business Rules
[] - Must be an employee authenticated to create categories.
[] - Shouldn't be able to create category already exists.
[] - Shouldn't be able to create category without existent parent category.

--------------------------------------------------------------------------------

## List Category

### **FR** => Functional requirements
[] - Should be able list all categories.

### **BR** => Business Rules
[] - Shouldn't need be an employee or customer authenticated to list categories.

--------------------------------------------------------------------------------

## Import Categories

### **FR** => Functional requirements
[] - Should be able to import csv categories files.
[] - Should be able to create an imported category.

### **BR** => Business Rules
[] - Must be an employee authenticated to import categories.
[] - Shouldn't be able to create an imported category previews existent.
[] - Shouldn't be able to create an imported category without existent parent category.

--------------------------------------------------------------------------------

## Nest Categories

### **FR** => Functional requirements
[] - Should be able to nest categories
[] - Should be able to show nested categories

### **BR** => Business Rules
[] - Shouldn't need be an user authenticated to list nested categories.


--------------------------------------------------------------------------------

## Sort Categories

### **FR** => Functional requirements
[] - Should be able to sort categories by category level

### **BR** => Business Rules
[] - Shouldn't need be an user authenticated to list nested categories.