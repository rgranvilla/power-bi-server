# Applications Requirements - Categories Use Cases
Obs: the "user" term are used to represent both employee and customer.

--------------------------------------------------------------------------------

## Register category

### **FR** => Functional requirements
[x] - Should be able to create a new category.

### **BR** => Business Rules
[x] - Must be an employee authenticated to create categories.
[x] - Shouldn't be able to create category already exists.
[x] - Shouldn't be able to create category without existent parent category.

--------------------------------------------------------------------------------

## List Category

### **FR** => Functional requirements
[x] - Should be able list all categories.

### **BR** => Business Rules
[x] - Shouldn't need be an employee or customer authenticated to list categories.

--------------------------------------------------------------------------------

## Import Categories

### **FR** => Functional requirements
[x] - Should be able to import a csv file of categories and save them into the app.

### **FNR** => Functional not requirements
[x] - Use multer to upload files

### **BR** => Business Rules
[x] - Shouldn't be able to import categories if don't be an employee authenticated.
[x] - Shouldn't be able to import an invalid file.
[x] - Shouldn't be able to import categories with non-existent parent.


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
[x] - Should be able to sort categories by category level

### **BR** => Business Rules
[x] - Shouldn't need be an user authenticated to list nested categories.