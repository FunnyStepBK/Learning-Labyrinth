use std::fs::File;
use std::io::{Read, Write};
use std::net::TcpListener;

fn main() ->  std::io::Result<()> {
    // Running on localhost 5000
    let listener = TcpListener::bind("127.0.0.1:5000")?;
    println!("The server is running on port 5000");

    for stream in listener.incoming() {
        match stream {
            Ok(mut stream) => {

                // Buffer to read the input
                let mut buffer = [0; 512];
                stream.read(&mut buffer)?;

                println!("Request: {}", String::from_utf8_lossy(&buffer));

                // Read the File Contents
                let mut file = File::open("../public/index.html")?;
                let mut contents = String::new();
                file.read_to_string(&mut contents)?;

                // Create a response
                let response = format!(
                    "HTTP/1.1 200 OK\r\n\
                    Content-Type: text/html\r\n\
                    Content-Length: {}\r\n\
                    \r\n\
                    {}",
                    contents.len(),
                    contents
                );

                // Write the response back to the client
                stream.write_all(response.as_bytes())?;
            }
            Err(e) => {
                eprintln!("Failed to accept connection: {}", e);
            }
        }
    }

    match listener.local_addr() {
        Ok(addr) => println!("Server is listning on {}", addr),
        Err(e) =>  eprintln!("Failed to get the local address: {}", e),
    }

    Ok(())
}

