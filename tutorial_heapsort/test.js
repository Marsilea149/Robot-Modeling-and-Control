// return the index of parent node for the node of index i 
function parentIndex(i)
{
    return Math.trunc((i-1)/2);
}
// return the index of left child node for the node of index i 
function leftChildIndex(i)
{
    return 2*i+1;
}
// return the index of right child node for the node of index i 
function rightChildIndex(i)
{
    return 2*i+2;  
}
//Exchange the first and the last element of A
function swap(A)
{
    n = A.length - 1;
    temp = A[n];
    A[n] = A[0];
    A[0] = temp;
    return A;
}
/*Assumption: the binary trees rooted at LEFT(i) and RIGHT(i) are min-heaps,
but A[i] might be bigger than its children, thus violating the min-heap properties.
Action: Let the values at A[i] "float down" in the min-heap 
so that the subtree rooted at index i obeys the min-heap properties.*/
function minHeapify(A, i)
{
    A.heapSize = A.length;
    l = leftChildIndex(i);
    r = rightChildIndex(i);
    var smallestIndex;
    //Compare the value of the parent and the children, keep the smallest one
    if (l < A.heapSize && A[l] <= A[i])
    {
        smallestIndex = l;
    }
    else 
    {
        smallestIndex = i;
    }
    if (r < A.heapSize && A[r] <= A[smallestIndex])
    {
        smallestIndex = r;
    }
    if (smallestIndex != i)
    {   
        //Exchange A[i] with A[smallestIndex]
        temp = A[i];
        A[i] = A[smallestIndex];
        A[smallestIndex] = temp;
        /*
        console.log("show A:")
        var j=0;
        for (j=0; j<A.length; j++)
            {
                console.log(A[j]);
            }
        console.log("end A----")
        */
        //Recursive call "float down" the min-heap
        minHeapify(A, smallestIndex);
    }
    return A;
}
/*
//VERIFY MINHEAPIFY FUNCTION
Am = minHeapify([8,7,5,6,1,2,3,4],0);

for (j=0; j<Am.length; j++)
{
    console.log(Am[j]);
}
*/

//Run bottom up, from the level above the leaves to the root, create min-heap level by level 
function buildMinHeap(A)
{
    var i;
    //console.log("buildMinHeap(A)");
    for (i = Math.trunc(A.length/2)-1; i >= 0; i--)
    {
        //console.log("minHeapify from buildMinHeap"+ i);
        minHeapify(A,i);
        /*
        console.log("show A:")
        for (j=0; j<A.length; j++)
            {
                console.log(A[j]);
            }
        console.log("end A----")
        */
    }
    return A;
}
/*
//VERIFY BUILDMINHEAP FUNCTION
Am = buildMinHeap([10,9,8,4,1,3,2,6,7]);
for (j=0; j<Am.length; j++)
{
    console.log(Am[j]);
}
*/
//From an array A, create a min-heap, then order them from the smallest to the biggest
function heapSort(A)
{
    res = [];
    console.log("---heapSort start---")
    //Step 1: build min heap from an unordered array A
    buildMinHeap(A);

    //Iteration index
    var k = 0;
    //Run this loop unless the heap is empty
    while (A.length > 0)
    {
        //Save the min element into the res array
        res.push(A[0]);
        //Swap the first and the last element of the ordered array
        swap(A);
        //Discard the last element from the array A
        A.pop();
        //The new heap may violate the heap property, run minHeap to fix it
        buildMinHeap(A);
        /*
        //Show the array after every iteration of the while loop
        console.log("show A at iteration-"+k)
        for (j=0; j<A.length; j++)
            {
                console.log(A[j]);
            }
        console.log("end A----")
        k++;
        */
    }
    return res;
}

//Check the result of heapSort(A)
Am = heapSort([10,9,8,4,1,3,2,6,7]);
for (j=0; j<Am.length; j++)
{
    console.log(Am[j]);
}
