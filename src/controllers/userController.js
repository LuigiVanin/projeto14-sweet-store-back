const getUser = (_req, res) => {
    const { name, email } = res.locals.user;

    return res.status(200).send({ name, email });
};

const getPaymentMethod = (_req, res) => {
    const { cardNumber, cardCode, cardExpire, cardName, cardType } =
        res.locals.user;
    return res.send({ cardNumber, cardCode, cardExpire, cardName, cardType });
};

export { getUser, getPaymentMethod };
