# Script to automate generating the HTML for the site. Useful since I can make
#  simple changes to the layout without having to manually change every card
# Literally just makes the static text and throws it into index.html

head = """<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />

        <!-- Styles -->
        <link rel="stylesheet" href="styles.css" />

        <title>Genuary 2025</title>
    </head>
    <body>
        <h1>/* GENUARY 2k25 */</h1>
        <p>
            Genuary's one of those projects I always return to when I'm bored
            out of my mind. It's really interesting, don't get me wrong - And
            it's certainly extremely enjoyable, but it's also a lot of work.
            And, it's a lot of consistent work.
        </p>
        <p>
            Now that I have a Real Person Job, I'm hoping that this year will
            finally be the year when I fully commit to finishing all of Genuary.
            Notice how I didn't say I would finish it on time - I'm definitely
            not stupid enough to try doing that. However, I will be finishing
            it. (Probably. Hopefully.)
        </p>
        <p>
            If I end up enjoying this more than I think I will, I'll probably go
            back and finish up Genuary 2023 and 2024. Maybe. Potentially.
        </p>
        <a href="https://www.github.com/sharmavins23">@sharmavins23</a>

        <p>----------------------- BEGIN PROMPTS -----------------------</p>
        <div class="prompts">
"""


def createPromptCard(day, prompt, desc):
    if day < 10:
        day = f"0{day}"
    if prompt == "":
        prompt = "TBD"
    if desc == "":
        desc = "ERROR: Not yet implemented"

    return f"""
            <div class="card">
                <h2>dateTime&lt2025-01-{day}&gt := {prompt}</h2>
                <canvas id="canvas{day}" width="400px" height="400px"></canvas>
                <div class="desc"><p>{desc}</p></div>
                <footer>
                    <a
                        target="_blank"
                        href="https://github.com/sharmavins23/genuary2025/blob/master/src/src{day}/gen{day}.js"
                        >/src.{day}</a
                    >
                    <script src="src/src{day}/gen{day}.js"></script>
                </footer>
            </div>
        """


# Create a prompt card for each of the 31 days
cards = []
for i in range(1, 32):
    cards.append(createPromptCard(i, "", ""))
cards = "\n".join(cards)

footer = """
        </div>
    </body>
</html>
"""

with open("index.html", "w") as f:
    f.write(head + cards + footer)
