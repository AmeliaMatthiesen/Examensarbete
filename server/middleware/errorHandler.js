const errorHandler = (err, req, res, next) => {
  // Använd befintlig statuskod om den är satt, annars defaulta till 500 (server error)
  const statusCode = res.statusCode !== 200 ? res.statusCode : 500;

  console.error(`[ERROR] ${err.message}`);

  res.status(statusCode).json({
    success: false,
    message: err.message || "Something went wrong",
    statusCode,
    // Visa stacktrace bara i development för säkerhet
    ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
  });
};

export default errorHandler;
