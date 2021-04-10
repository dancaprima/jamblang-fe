const History = () => {
    const historyData = localStorage.getItem('history')
    const data = JSON.parse(historyData)
    console.log(data)
    return <div>

    </div>
}

export default History