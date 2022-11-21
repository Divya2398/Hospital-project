import React, { useState } from "react";

import "./navbar.css";

const Navbar = () => {
  return (
    <>
      <nav className="navbar navbar-expand nav-1 py-0">
        <div className="container">
          <div>
            <ul className="navbar-nav">
              <li className="nav-item">
                <a
                  href="https://www.instagram.com/"
                  className="nav-link"
                  target="blank"
                >
                  <i className="fa-brands fa-instagram"></i>
                </a>
              </li>
              <li className="nav-item">
                <a
                  href="https://www.facebook.com/"
                  className="nav-link"
                  target="blank"
                >
                  <i className="fa-brands fa-facebook"></i>
                </a>
              </li>
              <li className="nav-item">
                <a
                  href="https://twitter.com/"
                  className="nav-link"
                  target="blank"
                >
                  <i className="fa-brands fa-twitter"></i>
                </a>
              </li>
              <li className="nav-item">
                <a
                  href="https://www.youtube.com/"
                  className="nav-link"
                  target="blank"
                >
                  <i className="fa-brands fa-youtube"></i>
                </a>
              </li>
            </ul>
          </div>
          <div className="">
            <ul className="navbar-nav">
              <li className="nav-item">
                <button className="rounded-pill text-white btn contact-font">
                  <i class="fa-solid fa-mobile-screen"></i>
                  {/* <i class="fa-solid fa-phone"></i> */}
                  +91-3456789100
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <nav className="navbar navbar-expand-md nav-2">
        <div className="container">
          <a href="#" className="navbar-brand">
            <img
              src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAoHCBYWFRgVFhIYGBgZGhocHBoaHBgeHBocHBoaGhwcGhocIS4lHB4rIRoaJjgmLC8xNTU1GiQ7QDs0Py40NTEBDAwMEA8QHhISHzgrJCw1NDQ0NDQ2MTo0PzQ2NjExNDY0PzQ0NDo0NDQ0NjQ0NDE0NDQ2NDQ0PzQ0NDQxPzE0OP/AABEIAOMA3gMBIgACEQEDEQH/xAAcAAEAAQUBAQAAAAAAAAAAAAAAAQIDBAUGBwj/xABCEAABAgQCBwcCBAMHAwUAAAABAAIREiExAwQFIjJBYXGRBkJRgaHR8LHBE1Ji4XKCkgcjQ6Ky0vEUU8IVJDNUk//EABoBAQADAQEBAAAAAAAAAAAAAAABAwQCBQb/xAAtEQACAgEDAwMDAgcAAAAAAAAAAQIDEQQhMRJBUQUTgTJhcRWRFCJCUrHR8P/aAAwDAQACEQMRAD8A9ee6agRr5aG6PbLUXRjZqm6AMbLU8lBbMYiyljpqFQ5xaYCyAlzpqDmjXSiBv7o5stRyRrYiY3QBjZankocyYxFlLHTUKhzi0wFkBLnTUHNGulEDf3RzZajkjWxExugDGy1PJQWxMwt7KWmahUOJBlFvdAS8zUClrgBKb+6h4lqFLWgiY39kBDGy1PJQWxMwt7KWmahUOJBlFvdAS8zUCAwEu/3R4lqEDYiY39kAYJb70LYmbdfojDNfchdAy7rdUAe6agRj5RA3R7ZahGNmETdAGNlqeSgtmMwt7KWOmoeagulMosgJc6ag5o10BKb+6PbLUI1sRMb+yAMbLUo5s1QjTNQo50tAgIayWp9Ecyao9UYS6hsjnFpgLICXOmoOdUa+UQN0e2WoujWgiJugIa2Wp5UQtmMwt7I0zUNrqXOIMBZAHGag51Rr5RA3R7ZahGtBETdAQ1stTyohbMZhb2RpmobKXOIMBZAHGag51RroCU390eJahGtBExv7ICGiWp9ELYmYW9kaZqOUucQYCyAOM1BzqjXQEpv7o8S1CNaCJjf2QENEtT6IWxM26/RGGbaQkgyi3ugJcZqDd4oHQEu+3CqOEuygaCJt9+iAhrZanlRCyYzCyMJdQ2Rzi0wFkBLjNQc6o10ogb+6PbLUXRrQRE3QENbLU8qIWxMwt7I0zUcjnEGUWQEuM1BzqjTCh50R4lqEa2apugDnTUHqjXS0PojmhtRfqjGg1N0BDWy1PKiFkxmFuKNJdR1uilziDAWQBxmoOdUa6UQN/dHANqL9Ua0ERN0BDWy1PKiFkxmHqjTNR3sjnwMoQEuM1BzqgcGiB/ZaXtH2jwcm0Fxme7ZY0iZw8TGzY7z5RsuGwMTNaUeXY2IcPLgwkwwSXQ7rW3cfFztUei7jBtZeyK3Yk+lbs7LM9r8thOka84z7DDwGl7ifCI1Y8IqcPSGdxTFmSbht3Ox8WB/ow2uI8yq9E6I/CbJg4bMu3e4ifEd/EYwjzJ5LIzGjmAF2I5+KAIwe4y+TGwb6KG0uEdJSfL/YxcTO43+Jm8qyFwGPd6nFH0VeX06LfiDEheTBePVz4LkdMmJJDWtG5rQABwEF6DozAY3BYGgQlBEN9Ix4k3UMnGCxg6TaIkteBDe391f/AOqY4xDvC4PsruJhztLHWI9VzWHm8fLP/DxGz4UdR3DwDv8AxPlRQSdQXh1B6qQ6Al324VWJgZlj2gtiOBv7K+W0mDgDx4ICtolqd/ghbEzbr8aLDyWkmYrnMLhM0woaO4tO/kswuIMBb5vQEudNQc6o18tD6I5obUX6o1oIiboCGtlqeVELZjMLeyNJdR1uilziDAWQBxmoOdUa6UQN/dHiWrfdGtBETdAQ1stTyopIjUcqqGGba9kcS2jbdUAayWp9Ecyao9UaSaOt0RziDBtuqAlzpqDnVGvloUcAKi/VGtBETdAQ0S1PKiFs2sPkEbE0dbpVY+YxiHDDZciMbyt3uP0A8fNRJpLLJSbZW/GmMrbipJs3hxNbftHVdpdOtyWAXkTPNGN/O4jebwFyfLeFuG4QaAG+5PiTxjvXi3bvSxzGbfWLMInDb/Kdc+bo+TQu6YOUtyq6zpjsa/LtxM5mWB7y5+K8AuO4G5A3BrYwHBe5ZDRzMJjWYTA1rQABvpvJ3nivGuwr2jP5eNi548zhvA9SF7c4kGAsrbnukV6dbNkudNQc6rF0j/8AG5u8e8VlOENm/VWczjMa2OI5rYg7RhHkN6oSyaDz7Srbrb9ldMgBuDiOgBsOO79JP0PktXpRzXRLHTNiYGBHoVrsqV01jZkp5R6qXTUHOqpdCErhGNCCARXmuIGYxywNZjvZAUtDkTCK0Oks1nGHXxsYA2cHvlPIgwXUK+ruVzn09j01mRayopwFvVavTOjnvBLGTDgRHoV5o/TGZ/8AtY3/AOj/AHUt7UZxuzmn+cHf6gVZ7EvJX768HYaMyOK11cJ4r+V3suzyz3SAOBmt1tFeU5Xt9nGXOHieMzIHqwj6Le5D+0nDJ/v8u5h/Mwh45lpgR5RXEqZI6V0Wd61stTyojmTawWDovTGDmRHCxWvAqQKOb/E0wI8ws5ziDAWVbWCxNPglzpqDnVGul1T8ijgBUX6o1oIibqCSGtlqeVELZjNu9kaY0dbopc4gwFvm9AHOmoOdUaZaHnRHCGz7o1oNXX6IA581AjXy0KOAFRfqjQDU36ICGtlqeSFk2sjSTtW6ISQYNt1QFnOZprWlzqBojz3ADiSQrWjWFrS5w136zuEbN5AfdYeknB+Ph4Is3WdvjCoB+d4LcNAIib/NyohLrsb7LZfktkumCXd7/Bax3/hse41g1x6An7L51mJqTEmpPiTUlfROPhl7HMPea4DdUiH3Xzs0Uqt9Hc8/U9i7lsZzHtewwcxwc0+BaQR6he66M09hYmXZjzANcKje13ebC5IPuvBgtx2d0o3AxB+IHOwnHWa01G6YcR4bwOStnBS5K67HFnpua088mXCEsaRhFx5Cw9VhDRGYxTMWur3nmB9a+i6rRYwnMa/DDSxwi1zYQd53PmsskgwFvkaqn3VHaKwafbct2zkMHsriOviMbyDney0mb0e/AeWvHJw2XDxB+y9LcIbPpVWcxlGYjS3EaHR8aGO4jwKqlNyeWWRSisI4jKFbvLNBECAQbgiIPMKzj6EewxZFzf8AMPLf5dFdyhUHRi57sXl8UEsmwnfpq3zYfsQuO0n2NzGGTJJiD9Jld5td9iV6rljRYOfF1ZG2SK5UxkeMZnJYjNvDe3m0w62WG4r1LOhaV+GJqgHyCsV/lFb03hnFZLFxGva7BLw8HVLIzelxwsveNCZ1z8BhxBDElbOBCAeQIw4RiuQyTQLADkuh0XiSuEbGh91XZPq7HddXR3N41stTyQsm1vlEaSdq3SqEkGAt83qotJc6ag5oHS6vyqOAGzfrRGgERN/kKICGtlqeVFJbNUclDTHat0UuJFG26oAGS1uhZNWyhpJ2rcaI4kHVtwqgJLpqCm9JpdX5VHADZvwrRYGm81+HgPedqAa3xme4MbTm4KJPCyEavQeLNmMV96EDkSIejV0RbHW+UXL9l3D8UtNi31BHuV1DiQYC3yNVi0EuqrL5bef3NWsj0247YRMZqCm9eF9sdGnL5zFZDVc6dn8L9anIzN/lXujgBs34VouM/tH0EcfAGOwRxcGJI3uwztCHi3aHI+K9OqXTI8++PVHbseSBVhWwqwthhOg7M9psTKOgNfCcYuwyd/5mHuu9Dv3Eeu6I0xhZjDD8J8wsdzmk7nNuD8EV4KFl6Pz+JgvD8J5Y8bxvHg4WcOBVU6lLdcl9drjs+D30NlqaoWTa3yi4zs/29w8SDMzDDf8An/wyfEm7POnFdiMSMC0xaYQIqCD4HessouLwzXGSksorLpqCm9WMXLtNC3W/MKdfFX3ADZvwqjQIRO168KLk6LLcEsuYhYWfC2Ta7XrRUvEaQi3lEcaoDjc6FpcTaXfZzQ+G6wIPAx9DFabM9lHGrMZsfBzSD6E/RTkGqyhW6yxVjB0BjNvJ1P3AWywNGPF4eUT9kJNrl3zNA3i55UV0Ol1flVQzDlaADE7z+yraARF11BBAbLU13IWTa3yiMJO1bjSqOJBgLfI1QEl01BTegMtDXejhDZvwqjQDtX40QAvmpZA+Wl0cANm/CqNAO1fjRAQGy1vuWr01hHEdhMFi9zyODGPh/ncwraNJO1bjSqw8Yf8AuGQsMPFtxfgx+iiSysA5LRmPJiNcTARgeRofrHyXctfCnyq4POYMj3M/K4gco09ILqtA5wYmHB202hjcjcft5Lx/TbemUqpfH5PT11fVGNi/7wbINlrfchZNrIwk7VuNKo4mOrbgvZPMPH+3XZn/AKfEONhN/uHmwthvPd4NO7p4R5QL6HzeXY9jmFoc14LXNuCDeK8d7W9lXZR0zIuwHHVdvYTZr/s7fzWqqzOz5Md1WP5lwc6FUFQFWFeUFYW20Np7Hy5/usQhu9jtZh/lNuYgVqQq2I0nszpNrdHo2S/tAENfBld4hxLOcIRHL1WQ/tJiP1mPYB+kA/WK83Yr+E8gxBIPCiiNcF2O3ZJ9zusXSmM6+K/yMPpBW25h5viP/qd7rm8DSTxch3P3C2WX0s3vNI5VXeIrhHPU+7Nzhvd+Z3UrKwsd477/AOorW4Gdwz/iAc6fVbHBc02cDyIK4kiyLNhh5/EsXxHED/lbDLaRpBzfMey1TGLJY2F6KiUYvsWxk0bfCcAJgYiyqLJtb5RarKZ1hxGsDg6MYwNBAE38VtSTHVtwtxVEl0stjLKJJmpbegdLq/Ko6A2b8K0RoEK7XrwouTogNlrfchbNW25GxO1bjRS6I2bcKoAGS1ukk1bI2PetxUOjHVtwQEzTUtvWO8S4rN+piDq7DP2WQ6Hdvw8FQYapdeMK3gbesEBzfabJlr24gs6h/iFuo/0rWZPMuw3B7d1x4jeF2Gdy34mG5jjCIoTuO4rinsLSWuECDA818/r6pVXe5Hvv8nsaSxWV+3Ltt8HcZbMtxWhzbX5eIPFXw+FLri9G552E6LbHaHj7Fddk8y3EaHAg/UcCNxXp6TVxvjh7Ncr/AEYdTppVSyuC6Gy1vu+dFZzgYWOOJLIQQ4OEQRYgjfHwV0H81gN9B8uuR0nnH5h8mG0loOq0b/1Hw87L0K4OT+xinLCOH0/oQB7n5drvw4xDCYlo4eI4XHFc+F7FlezZIjiP/lbU+bv2VjTPYXAxWxwz+Fi11qkOP62n6iB52Wp2wWyZl9mT3weThXGrM0tobHyzpcbDLY7LhVjv4Xb+VDwWE1WJp7oraxyXmK+1WGK+1dAvNV9qsNV5iAvsV9qsMV5qkGSx58T1V5pjdYzFkNUg3nZnDmxxwa4/b7rsppdW/wC65bsnhGZ7huaG/wBRif8ASOq6lsIa1+N1gveZmylYiQGy1vuSWbW+URke9bj4oYxps8LcVSWkkzUtvQOlpfejod2/BGw71+KAmealknlpdQ6HdvwRsO9figIllrfcqcTDmBIMPDmLKpke9bj4qXRjq24ICjDxZwN2/wAxQjr9FptP6OmE7RFwGtDeOXiPoti54ZiS93Eq0jc4CrfMCI4grLbCFb8b8FVdTG2DiyyqyVclJHn4WRlMy5jpmnmNx4ELa6Z0SRHEY2l3N+7R9QtI1fMXVz09njHDPchZC6Of3R0GYz5zLW4LNVzjrk2DQKw8Y/ZbXJZVuC2RreZ3k+JXGtMKhbnI6aLaYgmHjvHPx+XXrab1ZOKhbt9+zPOu0GG5Q3+x0Mstb7kljrenJWsrmGvEZg4fQ8RuKumMabPpxXqRkpLKeUYWmnhlGYwWYrSx7GuabtcA4HmCuH03/Z+0kuy7pD/23klp/hdVzfOPku8f+m/BGwhW/G/BWRlKPBXKEZcnh+f0ZjYDpcbCc07iatP8LhQ+RVlq9yfhBwLcRoc0iocAQfI3XM6T7EZd5LsKbCP6dZv9Jt5ELRC9f1FEqGvpPOWK81bvO9jsyzZDcVviw182mB6RWofguYZXscx3g4Fp6FXxnGXDKZRceUVtV9qsNV5i7IL7FfYsdiz9H5Y4j2sHeNT4DefII3jclLJ2PZnAkwA43eSYcLD0EfNbaWbWt+ypwWSgAiDQAADYQoPRVGMdW3Cy82UsybN0V0pImaalt6TS6vrzR0O7fh4I2EK7XG/BcnREstb7klmrbcpbHvW4o6PdtwQCWWt1Mk1bKGx71uKh0Y6tuCATTUtv8Uml1b/updDu34eCNhDWvxQGPnMoHMLSTWxFC1wqHA+IIWPozOHEJw3wbishM3c4bnt/SfQ0WeyPetx8Vr9K6PLy1+GZMVmw8W4td4tPzegNjNNS29aLSuhxGbDvctsDy8Cs3R+kRiCQtkxW0cz7t8W/OK2DYQ1r8bqm+iF0cSRZVbKuWYnCFpBgRAi4NwpC6vO6NbiVdquhR2/kfELns5kH4e0It3OFj7HmvndVobKd+V5PXp1UbduH4LOE8tMWkg+IW4ymmyKPER4ih8xY+i0oVYWerU20vMHj7djuymE+UdZls2wiLXA8LEeRVnM6UwWmLsUR8BFx/wAtlzUFQ/LtO6HJeh+sT6cYWfJkWhh1bt4Nzj9qMOww3HoAsQ9rXAQGCPNx/wBq1GJkDuIPOixcTLuF2nyr9Fz+o2y4ePg1Q0en8Z+TdN7WPb/hN6uVOJ2qm28sxw8C6nQtK556tOVkdZd/d/gu/gtO+xvjnci86+VOHxZbo0j6LKymiMjikDDxnxO6YA/0ubFcm5WnLXX6jdHl5M8/SaZfTsz0NvZPAbWL3cC4D6BbXJ6Pw8MajA0b4VJh4uNSuf7FZ7Fe17cQuLGwle6NzGImO19ui6gxjS3BelC52xUsnj2UKqbhtlCM1Lb/AB+XSaXVvx5qXQ7t+HgjYQ1r8bqTgiWWt93gplm1rcOShke9bj4oYxps8LcUAmmpbf4pNLS+9S6HdvwRsO9figE81LJPLS6Oh3b8EbDvX4oBLLW+5JZta37KGR71uPipdGOrbggIjNS2/wCdUml1b/updDu34eCNhDWvxvwQGDpHRjXweCWvGy8UI5+IVrL5xwIbjCDtzwNV0Pn/AAtkyPetx8VTjYQfSEWoCoOmp5xv8uhMNUiI9+CxmZcsOo6I8N6yGOEKiviUBo9K6Na0tDBrPJENwAEXO4AU6rX5jJPZUtMPzCo67vNdQzD1g411SAb3IJ+g6K6QY0t6cV5l3pldjbWz7Y4NkNXOKS5/JxgVQXS5rR+E6oaAfEU/Za7E0SO7itj4OI+o9l5dvpd8PpWV9jVDW1y52NaFUFkO0fiN7kR4gg/RWThuF2kcwQsE6bY/VFr8plysjLh5KXYYN2g8wCrTshhm7B5RH0V4FXG1oK8lUnNfST1Y4Zhf+k4X5P8AM73WXkdBsJphtgLk1h1jVbHKaOcavi0ep9ltsNktAIN9Ib16+i0F1rU7W0vHdmS7VtLpi8sjL4bQ0MaJQFcnl1bqXQ7t+CNhDWvxX0cYqKSXB5zbbyxLLW+5JZta37KGR71uPihjHVtwspIE01Lb0ml1fXmpdDu34eCNhCu168EAllrfcks1bbkbHvW4o6PdtwQAslrdAyatlDQRtW41RwJOrbhRAA6alt6Ty6t1LiDs34URpENa/FARCWt93zoks2t8ojARtW41qjoxpbggE01Lb0nl1bqHmOzfhRUR8boCvZrfchg6sYKxE971Vh7nbrIBiYBMSx8DxKwc1nMdglc0louWQBP8wBh0BV7FxHd30WK/MPHNSiDFw9IZQnXZiB3i5z3eodH0WywcLKuEWYgbwm/3VWozOI921htf/E0H6rBd+LGmUEOBIXXU/JGF4OoblQKtcCOEIq5i5tzQA2Lid11zuDi4n/aDfX6rYYWZfvCnq87kY8HQtIABIqRUGFPNVAA61t8OS02Fiv73qslj3eSq6Ud5NhNNwgpnhq+UeaxZidn0V1jqVv6qQXpZa33KAybWsqMOPetxVRj3bcEBIdNS29JpdX5VS6B2b8KURpENa/G6AES1vuSWbW+UUNiNq3GtUIMabPpxQAOmpbehdLS+9S6B2b8KI0gbV+NUAD5qWQvlpdHEHZvwojSBR1+NUAllrfcgbNrKGAjatxrVCCTFtuiAB01Lb/nVC6XV+VUuIOzfhSiNIAgb/IVQAtlrfcoDJqowEbVuNaoQSYtsgKQJqW3qlzANX5VXXEHZvwpRGkAQN/kKoC07LhtbqBlWnW+UV1oI2rcaoQSYjZ+RogLbcFrqQgpLANWUf8q44x2b8KI0gCBv8hVAW3ZdrawiqRlWnWh8CutBG1bjVCCTEbPyNEBabgh1IQUyAasPhV1xjs34UQEQgdr14VQFBww3ipGHHW8+iltNr1qhBjEbPpDfRAGmalkLpdVS4g7N+FEaQBB1+NUBBbLW+5SGza3yihgI2rca1QgkxbZAA6alt6F8ur8qpcQdm/ClEaQBA3+QqgBEtb7kAmrbcoaCNq3Gql0Ts24UQAslqKoGzVUNBFXW6o4EmLbdEAa6ahpvQvl1VLiDs36ICAIOv1QAtlqK7vnRA2bW+UUNBG1brVCCTEW+bkADpqGm9C+XVUuIOzfogIAg6/VAC2WoruQNm1vlFDQRtW61QgkxFvm5AA6ahpvQuhq/KqXEHZv0RpAEDf5CqAES1FUDZtb5RQ0Q2vdHAkxFvkaIAHTUNN6F0NX5VS4x2b9EaQBA3+QqgBEtRVJY63n0/wCFDRDa90IJMRs/I0QAGahpBJoavl1UuMdn2QEQgdr77qoAWy1FdyBs2soaCKut1QgkxbbogAdNQ03oXy6vyqlxB2b9KI0gCBv83oAWy1FdyBs2t8ooaCNq3VHAkxFvkaIAHTUNN6mMtBXejjHZv0RrgKOv1QFWPbzTA2URAW8vfyTG2uiIgK8xbz91ODs9URAUZe/koxtroiICvMW8/dThbPVEQFGXv5KMTb6IiArzFhzU4Wz1+6IgLeXueSYm10REBXmLDmpZs+R+6IgKcvcql+35j7IiAuY9vNMDZ6oiAt5e/l7JjbXREQFeYt5qcLZ6oiAt5e55Jj38lKID/9k="
              width="40"
              height="40"
              className="d-inline-block align-text-center me-2"
            />
            Title
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#boostrapnav"
            aria-controls="boostrapnav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <i
              className="fa-solid fa-bars"
              style={{ color: "rgb(223, 167, 13)", fontSize: "25px" }}
            ></i>
          </button>
          <div
            className="collapse navbar-collapse justify-content-center"
            id="boostrapnav"
          >
            <ul className="navbar-nav">
              <li className="nav-item">
                <a href="/" className="nav-link" aria-current="page">
                  Home
                </a>
              </li>
              <li className="nav-item">
                <a href="/doctor-list" className="nav-link">
                  Doctors
                </a>
              </li>
              <li className="nav-item">
                <a href="/patient-data" className="nav-link">
                  For Patient
                </a>
              </li>
              <li className="nav-item">
                <a href="/login" className="nav-link">
                  Login
                </a>
              </li>
              <li className="nav-item">
                <a href="/contact" className="nav-link">
                  Contact Us
                </a>
              </li>

              <li className="nav-item">
                <a href="/terms" className="nav-link">
                  Terms
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
