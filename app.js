
// building a really simple undirected graph first with no error handling
class Graph {
    constructor(){
        this.adjacencyList = {}
    }

    addVertex(vertexName){
        // add a key to the adjacency list with the name of the vertex
        //  and set its vaule to be an empty array
       
        if(!this.adjacencyList[vertexName]){
            this.adjacencyList[vertexName] = []

        }
        
    }

    addEdge(vertex1, vertex2){
        this.adjacencyList[vertex1].push(vertex2)
        this.adjacencyList[vertex2].push(vertex1)

    }

    removeEdge(vertex1, vertex2){
        // remove the edge by filtering the connection out of the array( for both vertecies)
        this.adjacencyList[vertex1] = this.adjacencyList[vertex1].filter(
            v => v !== vertex2
        )
        this.adjacencyList[vertex2] = this.adjacencyList[vertex2].filter(
            v => v !== vertex1
        )
    }

    removeVertex(vertex){
        // 1. remove all the edges or refrences to the vertex
        // just doing a while loop for fun. could easily be any other loop
        while(this.adjacencyList[vertex].length){
            // loop through and grab each item in the vertex array and call the remove edge
            const adjacentVertex = this.adjacencyList[vertex].pop()
            // order doesnt matter because its an undirected graph
            this.removeEdge(vertex, adjacentVertex)
        }
        // 2.remove the now empty vertex completly from the adjacency list
        delete this.adjacencyList[vertex]
    }
}

let g = new Graph
g.addVertex("Cooperstown")
g.addVertex("Austin")
g.addVertex("Charlotte")

g.addEdge("Cooperstown", "Charlotte")
g.addEdge("Austin", "Charlotte")
g.addEdge("Austin", "Cooperstown")





console.log(g);

