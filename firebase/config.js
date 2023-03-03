var admin = require("firebase-admin");

const serviceAccount = {
    "type": "service_account",
    "project_id": "crowd-cruisers",
    "private_key_id": "87048a3a155680ef1e21814f758d1bf363761700",
    "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQDCGOtjg+aMwLx5\nBxfoRAMS5hiHt8aFH/UfcVeTBakqTvnGmlBVawKknlMC5u3ZrCFoaUpskScCCy8l\nkU6+yTMujFQaSinWhRYBiCIYLcT8RHqZbp4U3ByHrakar2ilDVTqD8MmlBUKtrj9\n+AaaP6Rr7CxRIJbsSsCJeCpk0VuLYaIA5PArPuY+9zKpKW+xuHGym+NO4EoUgUmr\nLns1gStDrdSg3H21vU1Yc1E4jFtHaW/dUh7Mq6ZxsHhwLK2v4o++5t6a8GApGD3/\nUG2TkIXuxVnDi2OpKRI5MwI7k4xjjjrkqZJYK5S3QEpFBAVQk4oV6/LgMzIWUJSM\nuQRiFEZ9AgMBAAECggEAKWnWPZU82Z7dB+jAy9zJGBzysnB+gdSMAVG2aQb97WpM\n5nhx+Au9VGD4nseli7prpWLDz67X1xqKTHZ4ygHVcxLbdgGJdD1QsPJ6LdUEMPwu\neXLN9W7ygmuGB4zSI9dYnRlQXvidFbxfc8baJ8q4+xL48LVmplObyakTSJAX+4Cx\nyrAaBRVTsNwVYSpbh9CkwaM4+Qvlh8ZufgflG/STJRwduo0p8hdGpvauIhSPIYz0\n6d3ohG26gve/E+GXyGB2iLjVJ/QZjL9T183CUgGLqxi3ctdI3mrbZkNLBaUoStXF\nHVOfsQaaBLGHW1pf513xDYwdogEs980Eo4fCmD7wIQKBgQDvSQUUb0r5hCSfsktp\nJVZBtIftq6fr9ZHZmVpM5vrHF+FazcBlCPSUlQk73k0l0KtapI8Fhtxu+PSEFmrP\nFrZDxTsI2N+v4DagDaSZrqX8OiaBy9zx1mPYDeSVp/BPswIbMBmKZVtPkjPmO75u\nceajquA0muvIM8W5kSPaP7ZPnQKBgQDPp9WX1kXYpu0iUUxJ7Si0bw3+aUGOgmIL\nC1htj/LNdscCair52EY6z8scrOXQPlunE8GrE9pENJ7c5EKtzfQ3tJJSK+Dn2eJs\n6MRqyjZelFBwv4OS0ITewczztyyMx/F/pjIojTbyk5fwjc47keQ4+ytk0UDcKCz5\nnEnuhRvMYQKBgQC+vGXgNBZ/bmYDJgwWdDydg1oWiY4A+G6aFTN1uWiM6uwnhXqn\nDsxm46XIoxq72em9Bw86SJXNn4TJBVV+XYxL2RuFodosR31Dd5yNJDoLJA8tx2MH\nIu3Ter+Ky6My5G35Xg39021FsDTOgTD6uLAwJjUxuYvYuewSTy9U+RRJwQKBgQCA\n+lv+nUZw1O3BPQHHgRihScFFXhcr7uv6tCdOlfRXjgj6BPuAh8bHTL15qCJt/+1p\njynhmskdSBnMVbLcxWmFGBEyHLLrDzhGMSWets6iXDjCbxHIJOAChBlK32E6aA4m\nHRJWga+5Z9cdwNZxxaIdilRfoGFK3WFiAKMjFWY4wQKBgGKXmXxvluvCMRGLLvtO\nJevduhGwyMlwi2npjVev3NjXVgU8mBDh7zQD3bw5SGQuNFFSdo/pqLsPwYqbhTYn\nWvL7ikgQW9y06ZYAie0+oKA/5/bnnH7+Fl+z+zVtbzGaP+C1AZ2asemuQzSc9g4y\n8PnJuscfL2DGMr/qnkqZHjdk\n-----END PRIVATE KEY-----\n",
    "client_email": "firebase-adminsdk-uk4rx@crowd-cruisers.iam.gserviceaccount.com",
    "client_id": "104524272919695898350",
    "auth_uri": "https://accounts.google.com/o/oauth2/auth",
    "token_uri": "https://oauth2.googleapis.com/token",
    "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
    "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-uk4rx%40crowd-cruisers.iam.gserviceaccount.com"
}

const firebase = admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

module.exports = firebase
