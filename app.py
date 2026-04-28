from flask import Flask, render_template, jsonify
import os

app = Flask(__name__)

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/api/message')
def get_message():
    return jsonify({
        "greeting": "Hey IK you wont see this but still.....",
        "message": "I just wanna say Goodbye to you . As you will be leaving the city by 30th April. So not at least *Am sorry for eveything if I have hurted you then forgive me.I didn't mean to hurt you ever. Ik am not the boy of your choice and I hope you will find a better boy then me . Be happy be enjoyable and I hope you will find your next patner soon .*",
        "wishes": "I wish you all the best for your future and I hope you achieve all your dreams. Have a safe trip!🌸✨",
        "signOff": "❤️"
    })

# The following logic only runs if app.py is executed directly (local development)
if __name__ == '__main__':
    # Local-only imports to prevent errors on Vercel
    try:
        from threading import Timer
        import webbrowser
        from pyngrok import ngrok
        
        # If you have an ngrok authtoken, uncomment and set it here
        # ngrok.set_auth_token("YOUR_AUTHTOKEN_HERE")

        def open_browser(url):
            webbrowser.open_new(url)

        # Start ngrok tunnel for local testing
        try:
            public_url = ngrok.connect(5000).public_url
            print("\n" + "="*50)
            print(f" * LOCAL NGROK URL: {public_url}")
            print("="*50 + "\n")
            Timer(1.5, open_browser, [public_url]).start()
        except Exception as e:
            print(f"Ngrok didn't start: {e}. Opening localhost...")
            Timer(1.5, open_browser, ["http://localhost:5000/"]).start()

    except ImportError:
        print("Missing local dependencies (pyngrok, webbrowser). Running basic server.")

    app.run(debug=True, port=int(os.environ.get('PORT', 5000)))
