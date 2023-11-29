from flask import Flask, render_template, send_from_directory

app = Flask(__name__)

@app.route('/images/<img>')
def images_img(img):
    return send_from_directory('templates/images', img)

@app.route('/assets/<file>')
def assets_file(file):
    return send_from_directory('templates/assets', file)

@app.route('/assets/<resource>/<file>')
def assets_resource_file(resource, file):
    return send_from_directory(f'templates/assets/{resource}', file)


@app.route('/')
def homepage():  # put application's code here
    return render_template('index.html')

@app.route('/test')
def test():  # put application's code here
    return render_template('generic.html')

@app.route('/hint')
def hints():  # put application's code here
    return render_template('hints.html')


if __name__ == '__main__':
    app.run()
