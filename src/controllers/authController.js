const logIn = (req, res) => {
    console.log(req.body);
    return res.status(200).send({ message: "ok" });
};

export { logIn };
