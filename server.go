package main

import (
	"log"
	"net/http"
)

func main() {
	addr := ":5173"
	fs := http.FileServer(http.Dir("."))
	log.Printf("serving . on http://localhost%s", addr)
	if err := http.ListenAndServe(addr, fs); err != nil {
		log.Fatal(err)
	}
}
