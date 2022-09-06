
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
    // depth first traversal
    DFTrecursive(start) {
        // this is the results array we will be returning at the end
        const results = []
        // this will help keep track of where we have been
        const visited = {}
        // adding in this variable so the context of this can be used in the lower function
        const adjacencyList = this.adjacencyList
        // this is our recursive function that does the bulk of the work
        function DFS(vertex){
            // base case
            if(!vertex) return null
            // set visted to true for the given vertex
            visited[vertex] = true
            results.push(vertex)
            // for each edge(neighbor), see if we have visted. if not, call again on that neighbor
            adjacencyList[vertex].forEach(neighbor => {
                if(!visited[neighbor]){
                   return DFS(neighbor)
                }
            });
        }
        DFS(start)
        return results
    }
    // these will return slightly different results but are both Depth first implementations
    DFTiterative(start) {
        let results = []
        // make a stack from an array, instead of using the call stack like in the recursive implementation
        let stack = []
        let visited = {}
        // defining this here so we dont have to redefine it every time in the while loop
        let currentVertex
        stack.push(start)
        while(stack.length > 0){
            currentVertex = stack.pop()
            if(!visited[currentVertex]){
                visited[currentVertex] = true
                results.push(currentVertex)
                // loop through the current vertex's neighbors and add them to the stack
                this.adjacencyList[currentVertex].forEach(neighbor => {
                    if(!visited[neighbor]){
                        stack.push(neighbor)
                    }
                })
            }
        }
        return results
    }
}

let g = new Graph
g.addVertex("Cooperstown")
g.addVertex("Austin")
g.addVertex("Charlotte")

g.addEdge("Cooperstown", "Charlotte")
g.addEdge("Austin", "Charlotte")
g.addEdge("Austin", "Cooperstown")




console.log(g.adjacencyList);
console.log(g.DFTiterative("Austin"));

