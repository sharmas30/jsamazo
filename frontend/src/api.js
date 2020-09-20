{
    "name": "jsamazon",
    "version": "1.0.0",
    "description": "",
    "main": "index.js",
    "scripts": {
        "start": "nodemon --watch backend --exec babel-node backend/server.js",
        "build": "rm -rf dest && babel backend -d dist",
        "serve": "node dist/server.js",
        "test": "echo \"Error: no test specified\" && exit 1"
    },
    "repository": {
        "type": "git",
        "url": "git+https://github.com/sharmas30/jsamazo.git"
    },
    "author": "",
    "license": "ISC",
    "bugs": {
        "url": "https://github.com/sharmas30/jsamazo/issues"
    },
    "homepage": "https://github.com/sharmas30/jsamazo#readme",
    "dependencies": {
        "body-parser": "^1.19.0",
        "cors": "^2.8.5",
        "dotenv": "^8.2.0",
        "express": "^4.17.1",
        "express-async-handler": "^1.1.4",
        "jsonwebtoken": "^8.5.1",
        "mongoose": "^5.10.6",
        "multer": "^1.4.2"
    },
    "devDependencies": {
        "@babel/cli": "^7.11.6",
        "@babel/core": "^7.11.6",
        "@babel/node": "^7.10.5",
        "@babel/preset-env": "^7.11.5"
    }
}
console.log(err);
return { error: err.response.data.message || err.message };
}
};

export const createProduct = async() => {
    try {
        const { token } = getUserInfo();
        const response = await axios({
            url: `${apiUrl}/api/products`,
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        });
        if (response.statusText !== 'Created') {
            throw new Error(response.data.message);
        }
        return response.data;
    } catch (err) {
        return { error: err.response.data.message || err.message };
    }
};

export const updateProduct = async(product) => {
    try {
        const { token } = getUserInfo();
        const response = await axios({
            url: `${apiUrl}/api/products/${product._id}`,
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            data: product,
        });
        if (response.statusText !== 'OK') {
            throw new Error(response.data.message);
        }
        return response.data;
    } catch (err) {
        return { error: err.response.data.message || err.message };
    }
};

export const uploadProductImage = async(formData) => {
    try {
        const { token } = getUserInfo();
        const response = await axios({
            url: `${apiUrl}/api/uploads`,
            method: 'POST',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'multipart/form-data',
            },
            data: formData,
        });
        if (response.statusText !== 'Created') {
            throw new Error(response.data.message);
        } else {
            return response.data;
        }
    } catch (err) {
        return { error: err.response.data.message || err.message };
    }
};

export const signin = async({ email, password }) => {
    try {
        const response = await axios({
            url: `${apiUrl}/api/users/signin`,
            method: 'POST',
            header: {
                'Content-Type': 'application/json',
            },
            data: {
                email,
                password,
            },
        });
        if (response.statusText !== 'OK') {
            throw new Error(response.data.message);
        }
        return response.data;
    } catch (err) {
        console.log(err);
        return { error: err.response.data.message || err.message };
    }
};

export const register = async({ name, email, password }) => {
    try {
        const response = await axios({
            url: `${apiUrl}/api/users/register`,
            method: 'POST',
            header: {
                'Content-Type': 'application/json',
            },
            data: {
                name,
                email,
                password,
            },
        });
        if (response.statusText !== 'OK') {
            throw new Error(response.data.message);
        }
        return response.data;
    } catch (err) {
        console.log(err);
        return { error: err.response.data.message || err.message };
    }
};

export const update = async({ name, email, password }) => {
    try {
        const { _id, token } = getUserInfo();
        const response = await axios({
            url: `${apiUrl}/api/users/${_id}`,
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            data: {
                name,
                email,
                password,
            },
        });
        if (response.statusText !== 'OK') {
            throw new Error(response.data.message);
        }
        return response.data;
    } catch (err) {
        console.log(err);
        return { error: err.response.data.message || err.message };
    }
};

export const createOrder = async(order) => {
    try {
        const { token } = getUserInfo();
        const response = await axios({
            url: `${apiUrl}/api/orders`,
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            data: order,
        });
        if (response.statusText !== 'Created') {
            throw new Error(response.data.message);
        }
        return response.data;
    } catch (err) {
        return { error: err.response ? err.response.data.message : err.message };
    }
};

export const getOrder = async(id) => {
    try {
        const { token } = getUserInfo();
        const response = await axios({
            url: `${apiUrl}/api/orders/${id}`,
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        })
        if (response.statusText !== 'OK') {
            throw new Error(response.data.message);
        }
        return response.data;
    } catch (err) {
        return { error: err.message };
    }
};

export const getMyOrders = async() => {
    try {
        const { token } = getUserInfo();
        const response = await axios({
            url: `${apiUrl}/api/orders/mine`,
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        });
        if (response.statusText !== 'OK') {
            throw new Error(response.data.message)
        }
        return response.data;
    } catch (err) {
        return { error: err.response ? err.response.data.message : err.message };
    }
}