export default {
  view() {
    return [
      <div class="calendar">
        <div class="calendar-nav navbar">
          <button class="btn btn-action btn-link btn-lg">
            <i class="icon icon-arrow-left" />
          </button>
          <div class="navbar-primary">March 2017</div>
          <button class="btn btn-action btn-link btn-lg">
            <i class="icon icon-arrow-right" />
          </button>
        </div>
        <div class="calendar-container">
          <div class="calendar-header">
            <div class="calendar-date">Sun</div>
            <div class="calendar-date">Mon</div>
            <div class="calendar-date">Tue</div>
            <div class="calendar-date">Wed</div>
            <div class="calendar-date">Thu</div>
            <div class="calendar-date">Fri</div>
            <div class="calendar-date">Sat</div>
          </div>
          <div class="calendar-body">
            <div class="calendar-date prev-month disabled">
              <button class="date-item">26</button>
            </div>
            <div class="calendar-date prev-month disabled">
              <button class="date-item">27</button>
            </div>
            <div class="calendar-date prev-month disabled">
              <button class="date-item">28</button>
            </div>
            <div class="calendar-date current-month">
              <button class="date-item">1</button>
            </div>
            <div class="calendar-date current-month">
              <button class="date-item">2</button>
            </div>
            <div class="calendar-date current-month">
              <button class="date-item">3</button>
            </div>
            <div
              class="calendar-date current-month tooltip"
              data-tooltip="Today"
            >
              <button class="date-item date-today">4</button>
            </div>
            <div
              class="calendar-date current-month tooltip"
              data-tooltip="Not available"
            >
              <button class="date-item" disabled="">
                5
              </button>
            </div>
            <div class="calendar-date current-month">
              <button class="date-item">6</button>
            </div>
            <div class="calendar-date current-month">
              <button class="date-item">7</button>
            </div>
            <div
              class="calendar-date current-month tooltip"
              data-tooltip="You have appointments"
            >
              <button class="date-item badge">8</button>
            </div>
            <div class="calendar-date current-month">
              <button class="date-item">9</button>
            </div>
            <div class="calendar-date current-month">
              <button class="date-item">10</button>
            </div>
            <div class="calendar-date current-month">
              <button class="date-item">11</button>
            </div>
            <div class="calendar-date current-month">
              <button class="date-item">12</button>
            </div>
            <div class="calendar-date current-month">
              <button class="date-item">13</button>
            </div>
            <div class="calendar-date current-month">
              <button class="date-item">14</button>
            </div>
            <div class="calendar-date current-month">
              <button class="date-item">15</button>
            </div>
            <div class="calendar-date current-month calendar-range range-start">
              <button class="date-item active">16</button>
            </div>
            <div class="calendar-date current-month calendar-range">
              <button class="date-item">17</button>
            </div>
            <div class="calendar-date current-month calendar-range">
              <button class="date-item">18</button>
            </div>
            <div class="calendar-date current-month calendar-range">
              <button class="date-item">19</button>
            </div>
            <div class="calendar-date current-month calendar-range range-end">
              <button class="date-item active">20</button>
            </div>
            <div class="calendar-date current-month">
              <button class="date-item">21</button>
            </div>
            <div class="calendar-date current-month">
              <button class="date-item">22</button>
            </div>
            <div class="calendar-date current-month">
              <button class="date-item">23</button>
            </div>
            <div class="calendar-date current-month">
              <button class="date-item">24</button>
            </div>
            <div class="calendar-date current-month">
              <button class="date-item">25</button>
            </div>
            <div class="calendar-date current-month">
              <button class="date-item">26</button>
            </div>
            <div class="calendar-date current-month">
              <button class="date-item">27</button>
            </div>
            <div class="calendar-date current-month">
              <button class="date-item">28</button>
            </div>
            <div class="calendar-date current-month">
              <button class="date-item">29</button>
            </div>
            <div class="calendar-date current-month">
              <button class="date-item">30</button>
            </div>
            <div class="calendar-date current-month">
              <button class="date-item">31</button>
            </div>
            <div class="calendar-date next-month disabled">
              <button class="date-item">1</button>
            </div>
          </div>
        </div>
      </div>
    ]
  }
}
