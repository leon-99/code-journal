# The hello was wrapped around the annouce function to get its behaviors.


def annouce(f):
    def wrapper():
        print("About to run the function.")
        f()
        print("Done running the function")
    return wrapper

@annouce
def hello():
    print("Hello, world!")

hello()