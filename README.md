# Vending Machine Challenge

The parameters of this challenge was to build a Ruby vending machine that has a stock of snacks and coins that could be restocked. It would ask you for more money if the snacks being purchased wasn't enough and the give you change when you put too much in. 

Instead of building a simple CLI for this challenge, I thought I would build a rails API and React front end as I thought it would be fun to make an actual project that functioned and looked like a vending machine. The hardest part of the challenge was implementing a good algorithm for returning the change. Simply returning a figure of the amount paid minus the total of the snacks bought would not be enough, it would require an algorithm that chose specific denominations to be returned to the user. 

As this challenge is used quite a lot for code challenges, there is a wealth of information and ways of implementing this part... however, pretty much all the attempts I found used a method of returning the lowest amount of coins possible to the user. Whilst this would be a better user experience (receiving a £1 coin and a 50p coin for £1.50 of change) we all know that vending machines inavriably don't do this. 

My algorithm here worked on a principal of checking which coins had the highest amount of stock and checking if that coin would evenly go into the amount of change required. 

There are some improvements I would like to have implemented but didn't have time to do. Namely the main one of putting seperating out the actions that the Machine Controller was doing. I should have used multiple endpoints and controllers for the each transaction. I will change this going forward. 
