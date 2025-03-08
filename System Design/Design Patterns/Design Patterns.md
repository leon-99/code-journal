# Design Patterns

Design patterns are a way to organize the code for more efficient and maintainable software development. They provide solutions to common problems that software developers face, making it easier to design robust and scalable systems. By using design patterns, developers can improve code readability, reduce complexity, and enhance collaboration within the development team.

## List of Design Patterns

### MVC Pattern

- **Model-View-Controller (MVC)**: Separates an application into three interconnected components. The Model represents the data and the business logic, the View displays the data (UI), and the Controller handles the input and updates the Model. This separation helps in organizing code, making it more modular and easier to maintain.

### Service and Repository Patterns

- **Service**: Encapsulates the business logic of an application, providing a layer of abstraction between the presentation layer and the data access layer. It promotes code reusability and separation of concerns.
- **Repository**: Provides an abstraction over data storage, allowing the business logic to interact with data sources without needing to know the details of data access. It helps in achieving a clean separation between the domain and data mapping layers.

### Creational Patterns

- **Singleton**: Ensures a class has only one instance and provides a global point of access to it.
- **Factory Method**: Defines an interface for creating an object, but lets subclasses alter the type of objects that will be created.
- **Abstract Factory**: Provides an interface for creating families of related or dependent objects without specifying their concrete classes.
- **Builder**: Separates the construction of a complex object from its representation, allowing the same construction process to create different representations.
- **Prototype**: Specifies the kinds of objects to create using a prototypical instance, and creates new objects by copying this prototype.

### Structural Patterns

- **Adapter**: Converts the interface of a class into another interface clients expect, allowing classes to work together that couldn't otherwise because of incompatible interfaces.
- **Bridge**: Decouples an abstraction from its implementation so that the two can vary independently.
- **Composite**: Composes objects into tree structures to represent part-whole hierarchies, allowing clients to treat individual objects and compositions of objects uniformly.
- **Decorator**: Attaches additional responsibilities to an object dynamically, providing a flexible alternative to subclassing for extending functionality.
- **Facade**: Provides a unified interface to a set of interfaces in a subsystem, making the subsystem easier to use.
- **Flyweight**: Uses sharing to support large numbers of fine-grained objects efficiently.
- **Proxy**: Provides a surrogate or placeholder for another object to control access to it.

### Behavioral Patterns

- **Chain of Responsibility**: Passes a request along a chain of handlers, allowing each handler to either process the request or pass it to the next handler in the chain.
- **Command**: Encapsulates a request as an object, thereby allowing for parameterization of clients with queues, requests, and operations.
- **Interpreter**: Defines a grammatical representation for a language and provides an interpreter to deal with this grammar.
- **Iterator**: Provides a way to access the elements of an aggregate object sequentially without exposing its underlying representation.
- **Mediator**: Defines an object that encapsulates how a set of objects interact, promoting loose coupling by keeping objects from referring to each other explicitly.
- **Memento**: Captures and externalizes an object's internal state without violating encapsulation, so that the object can be restored to this state later.
- **Observer**: Defines a one-to-many dependency between objects so that when one object changes state, all its dependents are notified and updated automatically.
- **State**: Allows an object to alter its behavior when its internal state changes, appearing to change its class.
- **Strategy**: Defines a family of algorithms, encapsulates each one, and makes them interchangeable, allowing the algorithm to vary independently from clients that use it.
- **Template Method**: Defines the skeleton of an algorithm in a method, deferring some steps to subclasses.
- **Visitor**: Represents an operation to be performed on the elements of an object structure, allowing new operations to be defined without changing the classes of the elements on which it operates.
