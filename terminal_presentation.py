import os
import sys
import time
import turtle

def clear_console():
    os.system('cls' if os.name == 'nt' else 'clear')

def type_text(text, speed=0.06):
    """Prints text character by character for a typing effect."""
    for char in text:
        sys.stdout.write(char)
        sys.stdout.flush()
        time.sleep(speed)
    print()

def console_presentation():
    clear_console()
    time.sleep(1)
    
    type_text("Initializing a special program...", 0.05)
    time.sleep(1.5)
    clear_console()

    type_text("Hey...", 0.08)
    time.sleep(1.5)
    
    type_text("Just wait a few seconds ", 0.08)
    time.sleep(1.5)

    type_text(" I wanted to make this tiny script..", 0.08)
    time.sleep(1)
    
    type_text("\n(Please wait, opening a magic window...)\n", 0.05)
    time.sleep(2)

def draw_heart(t):
    """Draws a beautiful red heart."""
    t.color("red")
    t.fillcolor("red")
    t.begin_fill()
    t.left(140)
    t.forward(113)
    for _ in range(200):
        t.right(1)
        t.forward(1)
    t.left(120)
    for _ in range(200):
        t.right(1)
        t.forward(1)
    t.forward(112)
    t.end_fill()
    t.setheading(0)

def draw_flower(t):
    """Draws a cute flower."""
    # Draw the stem
    t.color("green")
    t.pensize(5)
    t.right(90)
    t.forward(120)
    t.backward(120)
    t.setheading(0)
    t.pensize(1)
    
    # Draw petals
    t.color("hot pink", "pink")
    t.begin_fill()
    for _ in range(12):
        t.circle(50, 60)
        t.left(120)
        t.circle(50, 60)
        t.left(120)
        t.right(30)
    t.end_fill()
    
    # Draw center
    t.color("gold", "yellow")
    t.begin_fill()
    t.setposition(t.xcor(), t.ycor() - 15)
    t.circle(15)
    t.end_fill()
    t.setposition(t.xcor(), t.ycor() + 15)

def write_message(t, text, x, y, size=20, color="white"):
    """Writes text on the turtle screen."""
    t.penup()
    t.goto(x, y)
    t.color(color)
    t.write(text, align="center", font=("Courier", size, "bold"))
    t.pendown()

def ui_presentation():
    # Setup the screen
    screen = turtle.Screen()
    screen.setup(width=900, height=650)
    screen.bgcolor("black")
    screen.title("For You \u2764\ufe0f")  # Heart emoji in title

    t = turtle.Turtle()
    t.hideturtle()
    
    # Intro text
    write_message(t, "No matter the distance...", 0, 180, 24, "white")
    time.sleep(1.5)

    t.speed(0) # Fastest drawing speed
    
    # Left flower
    t.penup()
    t.goto(-280, -30)
    t.pendown()
    draw_flower(t)

    # Right flower
    t.penup()
    t.goto(280, -30)
    t.pendown()
    draw_flower(t)

    # Middle heart
    t.penup()
    t.goto(0, -60)
    t.pendown()
    draw_heart(t)

    time.sleep(1.5)
    
    # Bottom messages
    write_message(t, "You'll always be in my heart. <3", 0, -220, 22, "pink")
    time.sleep(1.5)
    write_message(t, "Safe travels and see you soon! \u2728", 0, -270, 18, "white")
    
    # Keep the window open
    turtle.done()

def main():
    try:
        console_presentation()
        ui_presentation()
    except turtle.Terminator:
        # Avoid crashing if the user closes the window early
        pass
    except Exception as e:
        print(f"\nOops, something went wrong: {e}\n(But I still love you!)")

if __name__ == "__main__":
    main()
