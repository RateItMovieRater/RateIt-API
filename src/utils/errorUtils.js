function handleError(res, error){
    res.status(400).send({
        success: false,
        message: error.message
    })
}

export {
    handleError
}
