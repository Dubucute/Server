const express = require('express')
const app = express()
const port = 3005

app.get('/secpay', function (req, res) {
    if(req.query.card) {
        const list = req.query.card.split("|")
        const cc = list[0]
        const mm = list[1]
        const yyyy = list[2]
        const cvc = list[3]

        const NodeRSA = require('node-rsa');

        const rsaPublicKey = `-----BEGIN PUBLIC KEY-----
        MIICIjANBgkqhkiG9w0BAQEFAAOCAg8AMIICCgKCAgEA24gKlX5n/yeOKYOyAQ4L
        CiZtzWrhU3SoHfHBVEYufsMvSA/BQ8M985Foj+LWuM3NleRJVTPptfaVS8Oryr5R
        YlNYxOtUcUw5MeVBbkSRr8k56NY4mN7XTAPHwvol2ZeFUWhPJrzEmvN+eiU1TXJF
        1lqe0CDoYILjb5oAcGzjiPyfUsxYokCR7AWytdIrqjmqqN9QoBiB1QdpABCEwmBF
        h5owOhOrm8l/V9KGScd0+hAXYr+uJrGqh12EUhmc5AL5jZPxtYvdTmutVZOwXhfN
        C1ywIjdsGBnsCKPRlcUunf/J+NbRiPKVepsTGFbu7QrurSmXN/+moBZ/unG4WQSp
        k0RDoFazf7L0X2bIyL1vj7HT3x+IB0F6nKCLiKeUBncxFgbgit2TGEf5IbscFMVM
        CscTQBjh4F/zUw1d1u2DKAvXsrylhk2D3X9T4NM6Bypb+zU0mKVXMv+gMaoYEknO
        m/prohDvY1idfkf0cqhlkEkV7Fe6cV4MxHxuR0ig3yvHjEu5BvO1Slhtc/uumZvH
        KfhC/4dR4ZN5gl/Zqrj8M157fSQP4juvBx/iKThDTSc9a6tW9B9AesY+imV2zxLN
        NbFSrA9E6OXqEJweLSOa+ulJi/Tzs9LtYgg5l3WvuiR2FF5dI8c5JQsMEnrsDwp4
        hzBCevkp7JbUU+b25ZhSa6UCAwEAAQ==
        -----END PUBLIC KEY-----`;
        
        const key = new NodeRSA();
        key.importKey(rsaPublicKey, 'pkcs8-public-pem');
    
        const instrument = 'EAAQ' + key.encrypt(cc, 'base64');
        const cvv = 'EAAQ' + key.encrypt(cvc, 'base64');

        const object = {instrument:instrument, cvv:cvv}
        res.send(JSON.stringify(object))
    } else {
        const error = {error: {message: "missing_parameter"}}
        res.send(JSON.stringify(error))
    }
})

app.listen(port, () => {
    console.log('Running at localhost')
  })